
const TOKEN = 'Admin-Token';
const ROLE = 'User-Role';

export const BASE_API = ''

export function getToken() {
    console.log('token')
    return window.localStorage.getItem(TOKEN)
}

export function setToken(token) {
    console.log('settoken')
    window.localStorage.setItem(TOKEN, token)
}

export function getRole() {
    return window.localStorage.getItem(ROLE)
}

export function setRole(role) {
    window.localStorage.setItem(ROLE, role)
}