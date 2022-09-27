import getKey from '../util/utili18'
import { changeClass } from './util'

export class ClassManager {
  #correct
  #logX
  #logY
  #label
  #send

  constructor () {
    this.#send = document.getElementById(getKey('send', 'constant'))
    this.#label = document.getElementById(getKey('x', 'constant'))
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

      this.#label.classList.add(getKey('warning', 'constant'))
      this.#label.focus()
      this.#correct = this.#correct && false
    } else {
      this.#correct = this.#correct && true
      changeClass(this.#label, getKey('warning', 'constant'), getKey('normal', 'constant'))
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
      changeClass(this.#send, getKey('noActive', 'constant'), getKey('active', 'constant'))
      this.#send.disabled = false
    } else {
      changeClass(this.#send, getKey('active', 'constant'), getKey('noActive', 'constant'))
      this.#send.disabled = true
    }
  }
}