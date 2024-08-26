export function rgbFromHex(color: string) {
  color = color.replace('#', '')
  const n = color.length
  if (n == 3) {
    // convert rgb to rrggbb
    const r = color[0]
    const g = color[1]
    const b = color[2]
    color = `${r}${r}${g}${g}${b}${b}`
  }

  const rgb = parseInt(color, 16) // convert rrggbb to decimal
  return {
    r: (rgb >> 16) & 0xff, // extract red
    g: (rgb >> 8) & 0xff, // extract green
    b: (rgb >> 0) & 0xff, // extract blue
  }
}

export function rgbToHex(r: number, g: number, b: number) {
  r = Math.round(r)
  g = Math.round(g)
  b = Math.round(b)
  const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function colorContrast(color: string) {
  const { r, g, b } = rgbFromHex(color)
  const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000
  return contrast >= 128 ? 'black' : 'white'
}

// https://maketintsandshades.com/about
export function colorTint(color: string, factor = 0.1 /* 10% */) {
  let { r, g, b } = rgbFromHex(color)
  r += (255 - r) * factor
  g += (255 - g) * factor
  b += (255 - b) * factor
  return rgbToHex(r, g, b)
}

export function colorShade(color: string, factor = 0.88 /* 12% */) {
  let { r, g, b } = rgbFromHex(color)
  r *= factor
  g *= factor
  b *= factor
  return rgbToHex(r, g, b)
}
