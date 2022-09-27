'use strict'
import getKey from '../util/utili18.js'
import {ClassManager} from './classManager'


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
