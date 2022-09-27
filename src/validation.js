'use strict'
import getKey from './utili18'

const label = document.getElementById(getKey('x', 'constant'))
const send = document.getElementById(getKey('send', 'constant'))
const logX = document.getElementById(getKey('logX', 'constant'))
const logY = document.getElementById(getKey('logY', 'constant'))

export function validation () {
  send.classList.add(getKey('noActive', 'constant'))
  document.getElementById(getKey('x', 'constant')).addEventListener(getKey('change', 'constant'), (value) => {
    const result = parseFloat(value.target.value)
    if (!(result >= -3 && result <= 3)) {
      logX.textContent = getKey('errorX', 'constant')
      changeClass(logX, getKey('noError', 'constant'), getKey('error', 'constant'))

      label.classList.add(getKey('warning', 'constant'))
      label.focus()

      changeClass(send, getKey('active', 'constant'), getKey('noActive', 'constant'))
      send.disabled = true
    } else {
      if (logY.textContent === getKey('simpleString', 'constant')) {
        changeClass(send, getKey('noActive', 'constant'), getKey('active', 'constant'))
        send.disabled = false
      } else {
        changeClass(send, getKey('active', 'constant'), getKey('noActive', 'constant'))
        send.disabled = true
      }
      changeClass(label, getKey('warning', 'constant'), getKey('normal', 'constant'))
      logX.textContent = getKey('simpleString', 'constant')
      changeClass(logX, getKey('error', 'constant'), getKey('noError', 'constant'))
    }
  })

  const checkboxes = document.querySelectorAll('input[type=checkbox][name=y]')
  let enabledY = []

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener(getKey('change', 'constant'), function () {
      enabledY =
                Array.from(checkboxes)
                  .filter(i => i.checked)
                  .map(i => i.textContent)
      if (enabledY.length === 1) {
        logY.textContent = getKey('simpleString', 'constant')
        changeClass(logY, getKey('error', 'constant'), getKey('noError', 'constant'))

        changeClass(send, getKey('noActive', 'constant'), getKey('active', 'constant'))
        send.disabled = false
      } else {
        changeClass(send, getKey('active', 'constant'), getKey('noActive', 'constant'))
        send.disabled = true

        logY.textContent = getKey('errorY', 'constant')
        changeClass(logY, getKey('noError', 'constant'), getKey('error', 'constant'))
      }
    })
  })
}

function changeClass (label, oldClass, newClass) {
  label.classList.remove(oldClass)
  label.classList.add(newClass)
}
