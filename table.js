import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {getDatabase, ref, onChildAdded} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

import { firebaseConfig } from './config.js';
initializeApp(firebaseConfig);
const database = getDatabase();
const reference = ref(database, 'data/');

onChildAdded(reference, (childSnapshot) => {
    AddToTheTAble(childSnapshot.val());
});

function AddToTheTAble(data) {
    let formatter = new Intl.DateTimeFormat('nl-BE');
    let x = data.X;
    let y = data.Y;
    let r = data.R;
    let result = data.Result;
    let dateTime = data.Date.toLocaleString();

    let row = "<div  class='cell'>" + x + "</div>"
        + "<div class='cell'>" + y + "</div>"
        + "<div class='cell'>" + r + "</div>"
        + "<div class='cell'>" + result + "</div>"
        + "<div class='cell'>" + dateTime + "</div>";
    let table = document.getElementById("head_table");

    let el = document.createElement("div");
    el.classList.add('row');
    el.classList.add('new');
    el.innerHTML = row;
    insertAfter(table, el);
    return el;

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}
