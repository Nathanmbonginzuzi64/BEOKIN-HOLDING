import { apiUrl } from "@/lib/api-config";

const ADMIN_TOKEN_KEY = "beokin-admin-token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}

export async function loginAdmin(password: string) {
  const response = await fetch(apiUrl("/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("Mot de passe incorrect.");
  }

  const data = (await response.json()) as { token: string };
  setAdminToken(data.token);
}

export async function fetchPublishedInfos() {
  const response = await fetch(apiUrl("/infos"), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Impossible de charger les publications.");
  }
  return response.json();
}

export async function createInfoPost(input: unknown) {
  const token = getAdminToken();
  const response = await fetch(apiUrl("/infos"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Impossible de publier l'information.");
  }

  return response.json();
}

export async function updateInfoPost(id: string, input: unknown) {
  const token = getAdminToken();
  const response = await fetch(apiUrl(`/infos/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Impossible de modifier la publication.");
  }

  return response.json();
}

export async function deleteInfoPost(id: string) {
  const token = getAdminToken();
  const response = await fetch(apiUrl(`/infos/${id}`), {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de supprimer la publication.");
  }
}
