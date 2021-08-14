function getColor(a = 1, rgb = "0,0,0") {
  return `rgba(${rgb},${a})`;
}

export function lightSeaGreen(opacity) {
  return getColor(opacity, "44,185,176");
}
export function cetaceanBlue(opacity) {
  return getColor(opacity, "12,13,52");
}
