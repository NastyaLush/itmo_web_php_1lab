import { drawGraph } from '../style/canvas.js'
import { initialisation } from '../connection/firebase.js'
import { createTable } from '../table/table.js'
import { validation } from '../util/validation.js'


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

drawGraph()
initialisation(firebaseConfig)
createTable(firebaseConfig)
validation()


