export function loopSin(t, min, max) {
  return map(Math.sin(t * 2 * Math.PI), -1, 1, min, max)
}

export function map(srcValue, srcMin, srcMax, dstMin, dstMax) {
  const n = norm(srcValue, srcMin, srcMax)
  return lerp(n, dstMin, dstMax)
}

export function norm(value, min, max) {
  return (value - min) / (max - min)
}

export function lerp(t, min, max) {
  return min + (max - min) * t
}
