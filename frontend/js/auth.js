import {COOKIE_MAX_AGE_DAYS} from './config.js';

function setAuthCookie(token) {
    const days = COOKIE_MAX_AGE_DAYS;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    if (!token) { console.error("No token provided to setAuthCookie"); return; }
    document.cookie = `token=${encodeURIComponent(token)}; expires=${expires}; path=/`;
}

function getAuthCookie() {
    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export { setAuthCookie, getAuthCookie };