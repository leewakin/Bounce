import { Bounce } from './Bounce.js'

main()

function main() {
  const texts = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']

  const canvas = createCanvas(400, 400)
  const bounce = new Bounce(texts, canvas)

  bounce.startAnimation()
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  document.body.appendChild(canvas)
  return canvas
}
