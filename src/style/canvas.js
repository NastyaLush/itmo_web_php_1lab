'use strict'
import getKey from '../util/utili18.js'

import { ValidationFromGraph } from '../util/validation.js'

export function drawGraph () {
  const drawingCanvas = document.getElementById('canvas')
  if (drawingCanvas && drawingCanvas.getContext) {
    const context = drawingCanvas.getContext('2d')

    context.fillStyle = getKey('shapeColor', 'style')
    context.arc(150, 150, 100,Math.PI,3*Math.PI/2);
    context.moveTo(150, 50)
    context.lineTo(50, 150)
    context.lineTo(150, 150)
    context.fill()

    context.beginPath()
    context.moveTo(50, 150)
    context.lineTo(50, 250)
    context.lineTo(150, 250)
    context.lineTo(150, 150)
    context.closePath()
    context.stroke()
    context.fill()

    context.beginPath()
    context.moveTo(150, 250)
    context.lineTo(250, 150)
    context.lineTo(150, 150)

    context.closePath()
    context.stroke()
    context.fill()

    for (let x = 0.5; x < 300; x += 10) {
      context.moveTo(x, 0)
      context.lineTo(x, 300)
    }
    for (let y = 0.5; y < 300; y += 10) {
      context.moveTo(0, y)
      context.lineTo(300, y)
    }
    context.strokeStyle = getKey('lineColor', 'style')
    context.stroke()

    context.beginPath()
    context.moveTo(0, 150)
    context.lineTo(300, 150)
    context.moveTo(295, 145)
    context.lineTo(300, 150)
    context.lineTo(295, 155)

    context.moveTo(150, 0)
    context.lineTo(150, 300)
    context.moveTo(145, 5)
    context.lineTo(150, 0)
    context.lineTo(155, 5)

    context.strokeStyle = getKey('arrowColor', 'style')
    context.stroke()

    context.fillStyle = getKey('literalColor', 'style')
    context.font = getKey('literalFont', 'style')
    context.fillText(getKey('R', 'constant'), 248, 165)
    context.fillText(getKey('R', 'constant'), 48, 165)
    context.fillText(getKey('R', 'constant'), 148, 265)
    context.fillText(getKey('R', 'constant'), 148, 55)
  }
  const canvas = document.querySelector('canvas')

  canvas.addEventListener(getKey('click', 'constant'), function (e) {
    new ValidationFromGraph(canvas, e)
  })
}
