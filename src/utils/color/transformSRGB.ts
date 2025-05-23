// Types
import type { RGB, XYZ } from './colorUtils'

// Utilities
import { clamp } from '../helpers'

// For converting XYZ to sRGB
const srgbForwardMatrix = [
  [3.2406, -1.5372, -0.4986],
  [-0.9689, 1.8758, 0.0415],
  [0.0557, -0.204, 1.057],
]

// Forward gamma adjust
function srgbForwardTransform(C: number): number {
  return C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055
}

// For converting sRGB to XYZ
const srgbReverseMatrix = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505],
]

// Reverse gamma adjust
function srgbReverseTransform(C: number): number {
  return C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4
}

export function fromXYZ(xyz: XYZ): RGB {
  const rgb = Array.from({ length: 3 })
  const transform = srgbForwardTransform
  const matrix = srgbForwardMatrix

  // Matrix transform, then gamma adjustment
  for (let i = 0; i < 3; ++i) {
    // Rescale back to [0, 255]
    rgb[i] = Math.round(
      clamp(
        transform(
          matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2],
        ),
      ) * 255,
    )
  }

  return {
    r: rgb[0] as number,
    g: rgb[1] as number,
    b: rgb[2] as number,
  }
}

export function toXYZ({ r, g, b }: RGB): XYZ {
  const xyz: XYZ = [0, 0, 0]
  const transform = srgbReverseTransform
  const matrix = srgbReverseMatrix

  // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
  r = transform(r / 255)
  g = transform(g / 255)
  b = transform(b / 255)

  // Matrix color space transform
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b
  }

  return xyz
}
