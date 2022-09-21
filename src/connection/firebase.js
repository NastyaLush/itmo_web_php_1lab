import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, push, onValue } from 'firebase/database'
import getKey from '../util/utili18.js'
import { ValidationFromLabels } from '../util/validation.js'
import { onAuthStateChanged } from 'firebase/auth'

import firebase from 'firebase/compat/app'
import admin from 'firebase/compat/app'

let uid;

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

  admin.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    }
  });
}

export function addData(valid){
  const database = getDatabase()

  const reference = ref(database, uid)

  set(push(reference), {
    X: valid.x,
    Y: valid.y,
    R: valid.r,
    Result: valid.result,
    Date: valid.time
  })


}
export default class InitialisationForAddData {
  constructor (firebaseConfig) {
    initializeApp(firebaseConfig)
    this.database = getDatabase();
    this.reference = ref(this.database)
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
