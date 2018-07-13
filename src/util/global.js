
const TOKEN = 'Admin-Token';
const ROLE = 'User-Role';

export const BASE_API = 'http://console.home.vanke.com/vanke'

export function getToken() {
    return window.localStorage.getItem(TOKEN)
}

export function setToken(token) {
    window.localStorage.setItem(TOKEN, token)
}

export function getRole() {
    return window.localStorage.getItem(ROLE)
}

export function setRole(role) {
    window.localStorage.setItem(ROLE, role)
}