function getColor(a = 1, rgb = "0,0,0") {
  return `rgba(${rgb},${a})`;
}

export function lightSeaGreen(opacity) {
  return getColor(opacity, "44,185,176");
}
export function cetaceanBlue(opacity) {
  return getColor(opacity, "12,13,52");
}
export function redLightNeon(opacity) {
  return getColor(opacity, "255,0,88");
}
export function magicMint(opacity) {
  return getColor(opacity, "180,238,192");
}
export function paleBule(opacity) {
  return getColor(opacity, "177,236,247");
}
