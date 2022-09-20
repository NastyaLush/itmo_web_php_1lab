import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, push, onValue } from 'firebase/database'
import getKey from '../util/utili18.js'
import { ValidationFromLabels } from '../util/validation'

export function initialisation (firebaseConfig) {
  initializeApp(firebaseConfig)
  const button = document.getElementById(getKey('send', 'constant'))
  button.addEventListener(getKey('click', 'constant'),
    (e) => {
      const valid = new ValidationFromLabels()
      e.preventDefault()
      addData(valid);
      valid.backToFirstCondition(button)
    })

  setTimeout(() => {
    isConnection()
  }, 8000)
}
export function addData(valid){

  const database = getDatabase()
  const reference = ref(database)

  set(push(reference), {
    X: valid.x,
    Y: valid.y,
    R: valid.r,
    Result: valid.result,
    Date: valid.time
  }).then(r => {})

}
export default class InitialisationForAddData {
  constructor (firebaseConfig) {
    initializeApp(firebaseConfig)
    const database = getDatabase()
    this.reference = ref(database)
  }
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
