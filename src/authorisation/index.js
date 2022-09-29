import './main.css'

import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app'
import 'firebaseui/dist/firebaseui.css'
import admin from 'firebase/compat/app'
import getKey from '../util/utili18'
import { changeClass } from '../validation/util'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}

admin.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: '/lab_web1/public_html/src/main/index.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
});



active(document.getElementById(getKey('sheep', 'constant')));

function active(sheep) {
  sheep.addEventListener(getKey('click', 'constant'), () => {
    if (sheep.classList.contains(getKey('run', 'constant'))) {
      changeClass(sheep, getKey('run', 'constant'), getKey('stop', 'constant'));
      changeClass(document.getElementById(getKey('thoughts', 'constant')), getKey('run', 'constant'), getKey('stop', 'constant'));
    } else {
      changeClass(sheep, getKey('stop', 'constant'), getKey('run', 'constant'));
      changeClass(document.getElementById(getKey('thoughts', 'constant')), getKey('stop', 'constant'), getKey('run', 'constant'));

    }
  })
}

