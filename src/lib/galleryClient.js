const API_URL = "/api/gallery";
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

function requireTokenKey() {
  if (!TOKEN_KEY) {
    throw new Error("REACT_APP_TOKEN_KEY is not set.");
  }
  return TOKEN_KEY;
}

export function getAdminToken() {
  if (!TOKEN_KEY) return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  const tokenKey = requireTokenKey();
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.removeItem(tokenKey);
  }
}

export function uploadedImageUrl(image) {
  return image?.url || "";
}

async function parseJson(response) {
  const data = await response.json().catch(() => null);
  if (!data) {
    const error = new Error(
      "Gallery storage is unavailable. Open this page on the live Vercel site to upload photos.",
    );
    error.status = response.status;
    throw error;
  }
  if (!response.ok) {
    const error = new Error(data.error || "Gallery request failed.");
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function fetchGalleryState() {
  const response = await fetch(`${API_URL}?action=list`);
  return parseJson(response);
}

export async function loginToGallery(password) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", password }),
  });
  const data = await parseJson(response);
  setAdminToken(data.token);
  return data.token;
}

async function authorizedPost(body) {
  const token = getAdminToken();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return parseJson(response);
}

export function compressImage(file, maxSize = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read that image."));
    };

    image.src = objectUrl;
  });
}

export async function uploadGalleryImage(file) {
  const dataUrl = await compressImage(file);
  return authorizedPost({
    action: "upload",
    filename: file.name,
    dataUrl,
  });
}

export function deleteGalleryUpload(id) {
  return authorizedPost({ action: "delete", id });
}

export function setStaticImageHidden(id, hidden) {
  return authorizedPost({ action: hidden ? "hide" : "unhide", id });
}
