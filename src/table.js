import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onChildAdded } from 'firebase/database'
import getKey from './utili18'

export function createTable (firebaseConfig) {
  initializeApp(firebaseConfig)
  const database = getDatabase()
  const reference = ref(database)

  onChildAdded(reference, (childSnapshot) => {
    AddToTheTAble(childSnapshot.val())
  })

  function AddToTheTAble (data) {
    const x = data.X
    const y = data.Y
    const r = data.R
    const result = data.Result
    const dateTime = data.Date

    const row = "<div  class='content__scroll_table_row_cell'>" + x + '</div>' +
            "<div class='content__scroll_table_row_cell'>" + y + '</div>' +
            "<div class='content__scroll_table_row_cell'>" + r + '</div>' +
            "<div class='content__scroll_table_row_cell'>" + result + '</div>' +
            "<div class='content__scroll_table_row_cell'>" + dateTime + '</div>'
    const table = document.getElementById(getKey('headTable', 'constant'))

    const el = document.createElement(getKey('div', 'constant'))
    el.classList.add(getKey('row', 'constant'))
    el.classList.add(getKey('classNew', 'constant'))
    el.innerHTML = row
    insertAfter(table, el)
    return el

    function insertAfter (referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
  }
}
