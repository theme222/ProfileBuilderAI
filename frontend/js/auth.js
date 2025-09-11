import config from './config.js';

const authData = {
    username: 'testuser'
}


function setAuthCookie(token) {
    const days = config.COOKIE_MAX_AGE_DAYS;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `authToken=${encodeURIComponent(token)}; expires=${expires}; path=/`;
}

function getAuthCookie() {
    const match = document.cookie.match(/(?:^|; )authToken=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export { setAuthCookie, getAuthCookie, authData };