import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, push, onValue } from 'firebase/database'
import getKey from './utili18.js'

export function initialisation (firebaseConfig) {
  initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const button = document.getElementById(getKey('send', 'constant'))
  button.addEventListener(getKey('click', 'constant'),
    (e) => {
      const time = new Date().toUTCString()
      e.preventDefault()
      const x = parseFloat(document.getElementById(getKey('x', 'constant')).value).toLocaleString(3)
      const r = document.getElementById(getKey('r', 'constant')).value
      const checkedValue = document.querySelector('.y_text:checked').value
      const result = getResult(x, checkedValue, r)

      const database = getDatabase()
      const reference = ref(database)

      set(push(reference), {
        X: x,
        Y: checkedValue,
        R: r,
        Result: result,
        Date: time
      })

      // back all to the first condition
      const logX = document.getElementById(getKey('logX', 'constant'))
      const logY = document.getElementById(getKey('logY', 'constant'))
      document.getElementById(getKey('x', 'constant')).value = getKey('simpleString', 'constant')
      changeClass(document.getElementById(getKey('x', 'constant')),  getKey('normal', 'constant'), getKey('warning', 'constant'))
      changeClass(logX, getKey('noError', 'constant'), getKey('error', 'constant'))
      changeClass(logY, getKey('noError', 'constant'), getKey('error', 'constant'))
      logX.textContent = getKey('errorX', 'constant')
      logY.textContent = getKey('errorY', 'constant')
      changeClass(button,  getKey('active', 'constant'), getKey('noActive', 'constant'))
      button.disabled = true

      const checkbox = document.getElementsByName(getKey('y', 'constant'))
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false
      }
    })

  setTimeout(() => {
    isConnection()
  }, 8000)
}

function isConnection () {
  const db = getDatabase()
  const connectedRef = ref(db, '.info/connected')
  onValue(connectedRef, (snap) => {
    if (!(snap.val() === true)) {
      window.alert(getKey('connectionError', 'constant'))
    }
  })
}

function between (arg, downArg, highArg) {
  return arg >= downArg && arg <= highArg
}

function isInSquare (x, y, r) {
  return between(x, -r, 0) && between(y, -r, 0)
}

function isInTriangle (x, y, r) {
  return between(x, 0, r) && between(y, -(r - x), 0)
}

function isInSector (x, y, r) {
  if (between(x, -r, 0)) {
    if (between(y, 0, Math.sqrt(r ** 2 + x ** 2))) {
      return true
    }
  }
  return false
}

function isInShape (x, y, r) {
  return isInSector(x, y, r) || isInSquare(x, y, r) || isInTriangle(x, y, r)
}

function getResult (x, y, r) {
  if (isInShape(x, y, r)) return getKey('reach', 'constant')
  return getKey('miss', 'constant')
}

function changeClass (label, oldClass, newClass) {
  label.classList.remove(oldClass)
  label.classList.add(newClass)
}
