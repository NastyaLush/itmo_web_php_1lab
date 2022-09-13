'use strict'
import * as constants from './utilConstants'

const label = document.getElementById(constants.x)
const send = document.getElementById(constants.send)
const logX = document.getElementById(constants.logX)
const logY = document.getElementById(constants.logY)

export function validation () {
  send.classList.add(constants.noActive)
  document.getElementById(constants.x).addEventListener(constants.change, (value) => {
    const result = parseFloat(value.target.value)
    if (!(result >= -3 && result <= 3)) {
      logX.textContent = constants.errorX
      changeClass(logX, constants.noError, constants.error)

      label.classList.add(constants.warning)
      label.focus()

      changeClass(send, constants.active, constants.noActive)
      send.disabled = true
    } else {
      if (logY.textContent === constants.withOutError) {
        changeClass(send, constants.noActive, constants.active)
        send.disabled = false
      } else {
        changeClass(send, constants.active, constants.noActive)
        send.disabled = true
      }
      changeClass(label, constants.warning, constants.normal)

      logX.textContent = constants.withOutError
      changeClass(logX, constants.error, constants.noError)
    }
  })

  const checkboxes = document.querySelectorAll('input[type=checkbox][name=y]')
  let enabledY = []

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener(constants.change, function () {
      enabledY =
                Array.from(checkboxes)
                  .filter(i => i.checked)
                  .map(i => i.textContent)
      if (enabledY.length === 1) {
        logY.textContent = constants.withOutError
        changeClass(logY, constants.error, constants.noError)

        changeClass(send, constants.noActive, constants.active)
        send.disabled = false
      } else {
        changeClass(send, constants.active, constants.noActive)
        send.disabled = true

        logY.textContent = constants.errorY
        changeClass(logY, constants.noError, constants.error)
      }
    })
  })
}

function changeClass (label, oldClass, newClass) {
  label.classList.remove(oldClass)
  label.classList.add(newClass)
}
