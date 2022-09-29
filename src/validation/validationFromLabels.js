import getKey from '../util/utili18'
import { changeClass } from './util'
import { Result } from './result'

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

    const checkbox = document.getElementsByName(getKey('y', 'constant'))
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false
    }
    logX.style.fontSize= "15px";
    logY.style.fontSize= "15px";
  }
}