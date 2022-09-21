// import { drawGraph } from './style/canvas.js'
// import { initialisation } from './connection/firebase.js'
// import { createTable } from './main/table.js'
// import { validation } from './util/validation.js'
// import { initializeApp } from 'firebase/app'
// import * as firebaseui from 'firebaseui'
// import firebase from 'firebase/compat/app'
// // import firebase from 'firebase/compat/app';
// // import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
// import admin from 'firebase/compat/app'
// // import { getAuth } from 'firebase-admin/auth'
//
//
//
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId
// }
//
// drawGraph()
// initialisation(firebaseConfig)
// createTable(firebaseConfig)
// validation()
//
//
//
//
// admin.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// // Get the Auth service for the default app
// var authService = firebase.auth();
// const ui = new firebaseui.auth.AuthUI(firebase.auth())
// ui.start('#firebaseui-auth-container', {
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
// });

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
  signInSuccessUrl: '/lab_web1/src/main/index.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
});
