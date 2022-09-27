"use strict";
import * as style from "./utilStyles";
import * as constants from "./utilConstants";
export function drawGraph() {
    const drawingCanvas = document.getElementById('canvas');
    if (drawingCanvas && drawingCanvas.getContext) {
        const context = drawingCanvas.getContext('2d');

        context.fillStyle = style.shapeColor;
        context.beginPath();
        context.moveTo(150, 50);
        context.quadraticCurveTo(50, 50, 50, 150);
        context.lineTo(150, 150);
        context.closePath();
        context.stroke();
        context.fill();


        context.beginPath();
        context.moveTo(50, 150);
        context.lineTo(50, 250);
        context.lineTo(150, 250);
        context.lineTo(150, 150);
        context.closePath();
        context.stroke();
        context.fill();


        context.beginPath();
        context.moveTo(150, 250);
        context.lineTo(250, 150);
        context.lineTo(150, 150);

        context.closePath();
        context.stroke();
        context.fill();

        for (let x = 0.5; x < 300; x += 10) {
            context.moveTo(x, 0);
            context.lineTo(x, 300);
        }
        for (let y = 0.5; y < 300; y += 10) {
            context.moveTo(0, y);
            context.lineTo(300, y);
        }
        context.strokeStyle = style.lineColor;
        context.stroke();

        context.beginPath();
        context.moveTo(0, 150);
        context.lineTo(300, 150);
        context.moveTo(295, 145);
        context.lineTo(300, 150);
        context.lineTo(295, 155);

        context.moveTo(150, 0);
        context.lineTo(150, 300);
        context.moveTo(145, 5);
        context.lineTo(150, 0);
        context.lineTo(155, 5);

        context.strokeStyle = style.arrowColor;
        context.stroke();

        context.fillStyle = style.literalColor;
        context.font = style.literalFont;
        context.fillText(constants.R, 248, 165);
        context.fillText(constants.R, 48, 165);
        context.fillText(constants.R, 148, 265);
        context.fillText(constants.R, 148, 55);
    }
    const canvas = document.querySelector('canvas')
    canvas.addEventListener(constants.click, function (e) {
        getCursorPosition(canvas, e);
    })
}
//this function create x, y and r and fill labels
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    const r = document.querySelector('#r').selectedOptions[0].text;
    x = getX(x, r);
    y = createY(getY(y, r), r, x);
    document.getElementById(constants.x).value = x;
    document.getElementById(constants.x).dispatchEvent(new Event(constants.change));

    const checkbox = document.getElementsByName(constants.y);
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }
    document.getElementById(y.toString()).checked = true;
    document.getElementById(y.toString()).dispatchEvent(new Event(constants.change));
}

function getX(x, r) {
    const number = r / 130 * (x - 200);
    return number > 0 ? Math.min(number, 3) : Math.max(number, -3);
}

function getY(y, r) {
    return r / 130 * (200 - y);
}

function createY(y, r, x) {
    if (x > 0 && y < 0) {
        if (((r - x) + y) > 0) {
            return Math.ceil(y);
        } else {
            return Math.ceil(y) - 1;
        }
    }
    if (y < 0) {
        return Math.ceil(y) - 1;
    }
    if (y > 0) {
        return Math.floor(y) + 1;
    }
    return y;
}


