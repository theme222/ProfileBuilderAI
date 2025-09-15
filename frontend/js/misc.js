export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function clamp(number, lower, upper) {
  return Math.min(Math.max(number, lower), upper);
}

export function genRandomId(length = 16) {
  // Used for creating fake ids until the user syncs it with the backend
  // The resume will then get replaced with a real id.

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) 
    result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}
