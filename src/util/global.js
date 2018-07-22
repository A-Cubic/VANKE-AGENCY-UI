
const TOKEN = 'Admin-Token';
const ROLE = 'User-Role';

export const BASE_API = 'http://vanke.a-cubic.com/vanke'

export let WsCall = {
}

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

export function addWsCall(current, f) {
    WsCall[current] = f
    console.log(WsCall)
}

export function removeWsCall(current, f) {
    WsCall[current] = undefined
}

export function clearWsCall() {
    WsCall = {}
    console.log(WsCall)
}
