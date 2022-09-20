import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app'
import 'firebaseui/dist/firebaseui.css'
import admin from 'firebase/compat/app'

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

const authService = firebase.auth()
const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: '/lab_web/index.js',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
});