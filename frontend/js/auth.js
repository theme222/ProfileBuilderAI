import {COOKIE_MAX_AGE_DAYS} from './config.js';

const authData = {
    isAuthenticated: false,
    username: null,
}

// function setAuthCookie(token) {
//     const days = COOKIE_MAX_AGE_DAYS;
//     const expires = new Date(Date.now() + days * 864e5).toUTCString();
//     if (!token) { console.error("No token provided to setAuthCookie"); return; }
//     document.cookie = `token=${encodeURIComponent(token)}; expires=${expires}; path=/`;
// }

function getAuthCookie() {
    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

function deleteAuthCookie() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export { getAuthCookie, deleteAuthCookie, authData };