export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function clamp(number, lower, upper) {
  return Math.min(Math.max(number, lower), upper);
}