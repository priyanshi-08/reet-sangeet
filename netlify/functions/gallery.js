const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { getStore } = require("@netlify/blobs");

function loadEnvFile() {
  const envPath = path.resolve(__dirname, "../../.env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function getPassword() {
  return process.env.GALLERY_ADMIN_PASSWORD || "";
}

function getTokenKey() {
  return process.env.GALLERY_TOKEN_KEY || "";
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue));
  const right = Buffer.from(String(rightValue));
  if (left.length !== right.length) {
    crypto.timingSafeEqual(left, left);
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function signToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS, role: "gallery-admin" }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getTokenKey())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function isAuthorized(event) {
  const tokenKey = getTokenKey();
  if (!tokenKey) return false;

  const header = event.headers.authorization || event.headers.Authorization || "";
  const token = header.replace(/^Bearer\s+/i, "");
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = crypto
    .createHmac("sha256", tokenKey)
    .update(payload)
    .digest("base64url");
  if (!safeEqual(signature, expected)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.role === "gallery-admin" && data.exp > Date.now();
  } catch {
    return false;
  }
}

function emptyState() {
  return { hiddenStaticIds: [], uploads: [] };
}

async function readState(store) {
  const raw = await store.get("manifest", { type: "text" });
  if (!raw) return emptyState();
  const parsed = JSON.parse(raw);
  return {
    hiddenStaticIds: Array.isArray(parsed.hiddenStaticIds)
      ? parsed.hiddenStaticIds
      : [],
    uploads: Array.isArray(parsed.uploads) ? parsed.uploads : [],
  };
}

async function writeState(store, state) {
  await store.set("manifest", JSON.stringify(state));
}

function publicState(state) {
  return {
    hiddenStaticIds: state.hiddenStaticIds,
    uploads: state.uploads.map(({ id, createdAt }) => ({ id, createdAt })),
  };
}

exports.handler = async function handler(event) {
  let store;
  try {
    store = getStore({ name: "gallery", consistency: "strong" });
  } catch (error) {
    return json(503, {
      error: "Gallery storage is unavailable. Deploy this site on Netlify to enable uploads.",
    });
  }

  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters || {};

    if (params.action === "image") {
      if (!params.id || !/^[a-zA-Z0-9_-]+$/.test(params.id)) {
        return json(400, { error: "Missing image id." });
      }

      const record = await store.get(`image:${params.id}`, { type: "json" });
      if (!record?.data) return json(404, { error: "Image not found." });

      const base64 = String(record.data).replace(/^data:image\/\w+;base64,/, "");
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
        body: base64,
        isBase64Encoded: true,
      };
    }

    const state = await readState(store);
    return json(200, publicState(state));
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  let rawBody = event.body || "{}";
  if (event.isBase64Encoded) {
    rawBody = Buffer.from(rawBody, "base64").toString("utf8");
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(400, { error: "Invalid request." });
  }

  if (body.action === "login") {
    const password = getPassword();
    if (!password) {
      return json(503, { error: "Gallery password is not configured." });
    }
    if (!getTokenKey()) {
      return json(503, { error: "Gallery token key is not configured." });
    }
    if (!body.password || !safeEqual(body.password, password)) {
      return json(401, { error: "Incorrect password." });
    }
    return json(200, { token: signToken() });
  }

  if (!isAuthorized(event)) {
    return json(401, { error: "Please sign in again." });
  }

  const state = await readState(store);

  if (body.action === "hide" || body.action === "unhide") {
    if (!body.id || !String(body.id).startsWith("static-")) {
      return json(400, { error: "Only built-in gallery photos can be hidden." });
    }
    const hidden = new Set(state.hiddenStaticIds);
    if (body.action === "hide") hidden.add(body.id);
    else hidden.delete(body.id);
    state.hiddenStaticIds = Array.from(hidden);
    await writeState(store, state);
    return json(200, publicState(state));
  }

  if (body.action === "delete") {
    state.uploads = state.uploads.filter((image) => image.id !== body.id);
    await store.delete(`image:${body.id}`);
    await writeState(store, state);
    return json(200, publicState(state));
  }

  if (body.action === "upload") {
    const dataUrl = String(body.dataUrl || "");
    const match = dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
    if (!match) return json(400, { error: "Upload a JPG, PNG, or WEBP photo." });

    const bytes = Buffer.from(match[1], "base64").length;
    if (bytes > MAX_UPLOAD_BYTES) {
      return json(400, { error: "That photo is too large. Try a smaller image." });
    }

    const id = crypto.randomBytes(12).toString("hex");
    const upload = { id, createdAt: Date.now() };
    await store.setJSON(`image:${id}`, { data: dataUrl });
    state.uploads = [upload, ...state.uploads];
    await writeState(store, state);
    return json(200, publicState(state));
  }

  return json(400, { error: "Unknown action." });
};
