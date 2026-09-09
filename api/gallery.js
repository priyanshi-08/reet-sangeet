const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { del, head, put } = require("@vercel/blob");

function unquote(value) {
  const text = String(value || "").trim();
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1);
  }
  return text;
}

function loadEnvFile() {
  const envPath = path.resolve(__dirname, "../.env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = unquote(trimmed.slice(separator + 1));
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function findEnvValue(pattern) {
  const direct = Object.keys(process.env).find((key) => pattern.test(key) && process.env[key]);
  return direct ? unquote(process.env[direct]) : "";
}

function ensureBlobEnv() {
  // A connected store injects REET_SANGEET_*. Prefer those over a manually
  // pasted BLOB_READ_WRITE_TOKEN, which can point at a deleted store.
  const token =
    unquote(process.env.REET_SANGEET_READ_WRITE_TOKEN) ||
    findEnvValue(/^(?!BLOB_).*READ_WRITE_TOKEN$/) ||
    unquote(process.env.BLOB_READ_WRITE_TOKEN);
  const storeId =
    unquote(process.env.REET_SANGEET_STORE_ID) ||
    findEnvValue(/^(?!BLOB_).*STORE_ID$/) ||
    unquote(process.env.BLOB_STORE_ID);
  if (token) process.env.BLOB_READ_WRITE_TOKEN = token;
  if (storeId) process.env.BLOB_STORE_ID = storeId;
}

loadEnvFile();
ensureBlobEnv();

const MANIFEST_PATH = "gallery/manifest.json";
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function getPassword() {
  return process.env.GALLERY_ADMIN_PASSWORD || "";
}

function getTokenKey() {
  return process.env.GALLERY_TOKEN_KEY || "";
}

function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(body);
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

function isAuthorized(req) {
  const tokenKey = getTokenKey();
  if (!tokenKey) return false;

  const header = req.headers.authorization || "";
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

function normalizeState(parsed) {
  return {
    hiddenStaticIds: Array.isArray(parsed?.hiddenStaticIds) ? parsed.hiddenStaticIds : [],
    uploads: Array.isArray(parsed?.uploads) ? parsed.uploads : [],
  };
}

function publicState(state) {
  return {
    hiddenStaticIds: state.hiddenStaticIds,
    uploads: state.uploads.map(({ id, createdAt, url }) => ({ id, createdAt, url })),
  };
}

function blobAuth() {
  ensureBlobEnv();
  const storeId = process.env.BLOB_STORE_ID;
  // A connected Blob store on Vercel authenticates with OIDC. Passing a
  // manually copied token overrides that and can point at a deleted store.
  if (process.env.VERCEL && storeId) {
    return { storeId };
  }
  return process.env.BLOB_READ_WRITE_TOKEN
    ? { token: process.env.BLOB_READ_WRITE_TOKEN }
    : {};
}

async function readState() {
  try {
    const meta = await head(MANIFEST_PATH, blobAuth());
    const response = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return emptyState();
    return normalizeState(await response.json());
  } catch (error) {
    const message = String(error?.message || "");
    if (
      error?.name === "BlobNotFoundError" ||
      error?.status === 404 ||
      /requested blob does not exist|blob not found/i.test(message)
    ) {
      return emptyState();
    }
    throw error;
  }
}

async function writeState(state) {
  await put(MANIFEST_PATH, JSON.stringify(state), {
    ...blobAuth(),
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

function storageError(error) {
  const message = String(error?.message || "");
  if (/this store does not exist|store_not_found|store not found/i.test(message)) {
    return "The Blob store for this token no longer exists. In Vercel, open Storage, connect the current Blob store to this project, and redeploy. Do not reuse an old token from .env.";
  }
  if (/token|blob/i.test(message)) {
    return message.replace(/^Vercel Blob:\s*/i, "");
  }
  return "Gallery storage is unavailable.";
}

module.exports = async function handler(req, res) {
  ensureBlobEnv();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return send(res, 503, {
      error:
        "Gallery storage is not connected. Add BLOB_READ_WRITE_TOKEN to the Vercel Production environment, then redeploy.",
    });
  }

  try {
    if (req.method === "GET") {
      return send(res, 200, publicState(await readState()));
    }

    if (req.method !== "POST") {
      return send(res, 405, { error: "Method not allowed." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    if (body.action === "login") {
      const password = getPassword();
      if (!password) {
        return send(res, 503, { error: "Gallery password is not configured." });
      }
      if (!getTokenKey()) {
        return send(res, 503, { error: "Gallery token key is not configured." });
      }
      if (!body.password || !safeEqual(body.password, password)) {
        return send(res, 401, { error: "Incorrect password." });
      }
      return send(res, 200, { token: signToken() });
    }

    if (!isAuthorized(req)) {
      return send(res, 401, { error: "Please sign in again." });
    }

    const state = await readState();

    if (body.action === "hide" || body.action === "unhide") {
      if (!body.id || !String(body.id).startsWith("static-")) {
        return send(res, 400, { error: "Only built-in gallery photos can be hidden." });
      }
      const hidden = new Set(state.hiddenStaticIds);
      if (body.action === "hide") hidden.add(body.id);
      else hidden.delete(body.id);
      state.hiddenStaticIds = Array.from(hidden);
      await writeState(state);
      return send(res, 200, publicState(state));
    }

    if (body.action === "delete") {
      const current = state.uploads.find((image) => image.id === body.id);
      state.uploads = state.uploads.filter((image) => image.id !== body.id);
      if (current?.url) await del(current.url, blobAuth());
      await writeState(state);
      return send(res, 200, publicState(state));
    }

    if (body.action === "upload") {
      const dataUrl = String(body.dataUrl || "");
      const match = dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
      if (!match) return send(res, 400, { error: "Upload a JPG, PNG, or WEBP photo." });

      const bytes = Buffer.from(match[1], "base64");
      if (bytes.length > MAX_UPLOAD_BYTES) {
        return send(res, 400, { error: "That photo is too large. Try a smaller image." });
      }

      const id = crypto.randomBytes(12).toString("hex");
      const blob = await put(`gallery/${id}.jpg`, bytes, {
        ...blobAuth(),
        access: "public",
        contentType: "image/jpeg",
      });
      state.uploads = [{ id, createdAt: Date.now(), url: blob.url }, ...state.uploads];
      await writeState(state);
      return send(res, 200, publicState(state));
    }

    return send(res, 400, { error: "Unknown action." });
  } catch (error) {
    return send(res, 503, { error: storageError(error) });
  }
};

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
