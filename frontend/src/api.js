const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getEmail() {
    return localStorage.getItem(EMAIL_KEY);
}
export function setEmail(email) {
    localStorage.setItem(EMAIL_KEY, email);
}
export function clearEmail() {
    localStorage.removeItem(EMAIL_KEY);
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
}

export async function api (path, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch (path, {...options, headers});
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Unknown error');
    }
    return data;
}