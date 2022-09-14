import { onChildAdded } from 'firebase/database'
import getKey from './utili18'
import InitialisationForAddData from './firebase'

export function createTable (firebaseConfig) {
  const reference = new InitialisationForAddData(firebaseConfig).reference

  onChildAdded(reference, (childSnapshot) => {
    addToTheTAble(childSnapshot.val())
  })

  function addToTheTAble (data) {
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
