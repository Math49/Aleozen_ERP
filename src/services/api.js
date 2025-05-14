import { getAuthToken } from "@/services/auth";
const API_BASE_URL = "https://api.aleozen.mathis-mercier.mds-angers.yt/api";

export async function fetchData(endpoint, options = {}) {
  try {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
