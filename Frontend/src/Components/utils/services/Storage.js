export function setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function removeSessionStorage(key) {
    return sessionStorage.removeItem(key);
}