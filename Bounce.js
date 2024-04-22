import { loopSin } from './math.js'

export class Bounce {
  texts
  canvas
  ctx
  index = 0
  lastTime = 0
  duration = 1500

  constructor(texts = [], canvas) {
    this.texts = texts
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  startAnimation() {
    const render = timestamp => {
      if (timestamp - this.lastTime > this.duration) {
        this.lastTime = timestamp
        this.index = (this.index + 1) % this.texts.length
      }

      const text = this.texts[this.index]
      const process = (timestamp - this.lastTime) / this.duration
      this.draw(text, process)

      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  }

  draw(text, process) {
    const { width, height } = this.canvas
    const maxSin = 40

    this.clearCanvas(width, height)
    this.setupTextStyles()
    this.translateAndDrawText(text, width, height, maxSin)
    const imageData = this.ctx.getImageData(0, 0, width, height).data
    const xResolution = 5.0
    const yResolution = 5.0

    this.drawWave(
      imageData,
      width,
      height,
      xResolution,
      yResolution,
      process,
      maxSin
    )
  }

  clearCanvas(width, height) {
    this.ctx.clearRect(0, 0, width, height)
  }

  setupTextStyles() {
    this.ctx.font = '360px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
  }

  translateAndDrawText(text, width, height, maxSin) {
    this.ctx.translate(width / 2, height / 2)
    this.ctx.fillText(text, 0, maxSin)
    this.ctx.resetTransform()
  }

  drawWave(
    imageData,
    width,
    height,
    xResolution,
    yResolution,
    process,
    maxSin
  ) {
    this.ctx.fillStyle = 'black'
    this.ctx.lineWidth = 0.5
    for (let y = 0.0; y < width; y += yResolution) {
      this.ctx.beginPath()
      for (let x = 0.0; x < height; x += xResolution) {
        let newY = y + Math.sin(x * 0.2 + process * 4 * Math.PI) * 4
        if (this.isPixelHit(imageData, height, x, y)) {
          newY = newY - loopSin(process, 0, maxSin)
        }
        this.ctx.lineTo(x, newY)
      }
      this.ctx.lineTo(width, y)
      this.ctx.lineTo(width + 2, height + 2)
      this.ctx.lineTo(-2, height + 2)
      this.ctx.fillStyle = 'white'
      this.ctx.fill()
      this.ctx.fillStyle = 'black'
      this.ctx.stroke()
    }
  }

  isPixelHit(imageData, height, x, y) {
    const pixelX = Math.floor(x)
    const pixelY = Math.floor(y)
    const index = (pixelY * height + pixelX) * 4
    return imageData[index] > 0
  }
}
