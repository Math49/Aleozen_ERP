import Cookies from "js-cookie";
const { fetchData } = require("@/services/api");
const TOKEN_KEY = "auth_token";


export async function login(email, password) {
    try {
      const res = await fetchData("/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
      });

      setAuthToken(res.token);

      return await res;
    } catch (error) {
      return null;
    }
  }
  

// ✅ Sauvegarde le token dans les cookies
export function setAuthToken(token) {
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: "Strict" });
}

// ✅ Récupère le token depuis les cookies
export function getAuthToken() {
  return Cookies.get(TOKEN_KEY);
}

// ✅ Supprime le token (lorsque la PWA est fermée)
export function removeAuthToken() {
  Cookies.remove(TOKEN_KEY);
}

