'use strict'
import getKey from './utili18'
import { addData } from '../connection/firebase'

class ClassManager {
  #correct
  #logX
  #logY

  constructor () {
    this.#logX = document.getElementById(getKey('logX', 'constant'))
    this.#logY = document.getElementById(getKey('logY', 'constant'))
  }

  managing (x) {
    const y = document.querySelectorAll('input[type=checkbox][name=y]')
    this.#correct = true
    this.#manageX(x)
    this.#manageY(y)
    console.log(this.#correct)
    this.#manageSend()
  }

  #manageX (x) {
    if (!(x >= -3 && x <= 3)) {
      this.#logX.textContent = getKey('errorX', 'constant')
      changeClass(this.#logX, getKey('noError', 'constant'), getKey('error', 'constant'))

      label.classList.add(getKey('warning', 'constant'))
      label.focus()
      this.#correct = this.#correct && false
    } else {
      this.#correct = this.#correct && true
      changeClass(label, getKey('warning', 'constant'), getKey('normal', 'constant'))
      this.#logX.textContent = getKey('simpleString', 'constant')
      changeClass(this.#logX, getKey('error', 'constant'), getKey('noError', 'constant'))
    }
  }

  #manageY (y) {
    const enabledY =
      Array.from(y)
        .filter(i => i.checked)
        .map(i => i.textContent)

    if (enabledY.length === 1) {
      this.#logY.textContent = getKey('simpleString', 'constant')
      changeClass(this.#logY, getKey('error', 'constant'), getKey('noError', 'constant'))
      this.#correct = this.#correct && true
    } else {
      this.#correct = this.#correct && false
      this.#logY.textContent = getKey('errorY', 'constant')
      changeClass(this.#logY, getKey('noError', 'constant'), getKey('error', 'constant'))
    }
  }

  #manageSend () {
    if (this.#correct === true) {
      changeClass(send, getKey('noActive', 'constant'), getKey('active', 'constant'))
      send.disabled = false
    } else {
      changeClass(send, getKey('active', 'constant'), getKey('noActive', 'constant'))
      send.disabled = true
    }
  }
}

const label = document.getElementById(getKey('x', 'constant'))
const send = document.getElementById(getKey('send', 'constant'))
const classManager = new ClassManager()

export function validation () {
  send.classList.add(getKey('noActive', 'constant'))
  const checkboxes = document.querySelectorAll('input[type=checkbox][name=y]')

  document.getElementById(getKey('x', 'constant')).addEventListener(getKey('change', 'constant'), (value) => {
    const resultX = parseFloat(value.target.value)
    classManager.managing(resultX)
  })

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener(getKey('change', 'constant'), function () {
      classManager.managing(parseFloat(document.getElementById(getKey('x', 'constant')).value))
    })
  })
}

function changeClass (label, oldClass, newClass) {
  label.classList.remove(oldClass)
  label.classList.add(newClass)
}

export class ValidationFromLabels {
  constructor () {
    this.time = new Date().toUTCString()
    this.x = parseFloat(document.getElementById(getKey('x', 'constant')).value).toLocaleString(3)
    this.y = document.querySelector('.y_text:checked').value
    this.r = document.getElementById(getKey('r', 'constant')).value
    this.result = new Result(this.x, this.y, this.r).result
  }


  backToFirstCondition (button) {
    const logX = document.getElementById(getKey('logX', 'constant'))
    const logY = document.getElementById(getKey('logY', 'constant'))

    document.getElementById(getKey('x', 'constant')).value = getKey('simpleString', 'constant')
    changeClass(document.getElementById(getKey('x', 'constant')), getKey('normal', 'constant'), getKey('warning', 'constant'))

    changeClass(logX, getKey('noError', 'constant'), getKey('error', 'constant'))
    changeClass(logY, getKey('noError', 'constant'), getKey('error', 'constant'))

    logX.textContent = getKey('errorX', 'constant')
    logY.textContent = getKey('errorY', 'constant')
    changeClass(button, getKey('active', 'constant'), getKey('noActive', 'constant'))
    button.disabled = true

    const checkbox = document.getElementsByName(getKey('y', 'constant'))
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false
    }
  }
}

export class ValidationFromGraph {
  constructor (canvas, event) {
    this.time = new Date().toUTCString()
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    this.r = document.getElementById(getKey('r', 'constant')).value
    this.x = this.getX(x, this.r)
    this.y = this.getY(y, this.r);
    const res = new Result(this.x, this.y, this.r);
    this.result = res.result
    addData(this);

  }

  getX (x, r) {
    return( r / 130 * (x - 200)).toLocaleString(3);
  }

  getY (y, r) {
    return (r / 130 * (200 - y)).toLocaleString(3);
  }

}
class Result{
  result;
  constructor (x,y,r) {
    this.result = this.getResult(x,y,r);
  }
  between (arg, downArg, highArg) {
    return arg >= downArg && arg <= highArg
  }

  isInSquare (x, y, r) {
    return this.between(x, -r, 0) && this.between(y, -r, 0)
  }

  isInTriangle (x, y, r) {
    return this.between(x, 0, r) && this.between(y, -(r - x), 0)
  }

  isInSector (x, y, r) {
    if (this.between(x, -r, 0)) {
      if (this.between(y, 0, Math.sqrt(r ** 2 - x ** 2))) {
        return true
      }
    }
    return false
  }

  isInShape (x, y, r) {
    return this.isInSector(x, y, r) || this.isInSquare(x, y, r) || this.isInTriangle(x, y, r)
  }

  getResult (x, y, r) {
    if (this.isInShape(x, y, r)) return getKey('reach', 'constant')
    return getKey('miss', 'constant')
  }
}
