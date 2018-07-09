
export const BASE_API = ''

export function getToken() {
    window.localStorage.getItem('Admin-Token')
}

export function setToken(token) {
    window.localStorage.setItem('Admin-Token', token)
}