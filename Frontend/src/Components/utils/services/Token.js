import jwt from 'jwt-decode';

import { setSessionStorage, getSessionStorage, removeSessionStorage } from "./Storage";


export function decodeToken() {
    return jwt(getToken());
}

export function getToken() {
    return getSessionStorage("CURRENT_USER");
}

export function setToken(token) {
    setSessionStorage("CURRENT_USER", token)
}

export function removeToken() {
    removeSessionStorage("CURRENT_USER");
}