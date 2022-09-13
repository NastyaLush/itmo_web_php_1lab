import {initializeApp} from "firebase/app";
import {getDatabase, ref, onChildAdded} from "firebase/database";

export function createTable(firebaseConfig) {
    initializeApp(firebaseConfig);
    const database = getDatabase();
    const reference = ref(database, 'data/');

    onChildAdded(reference, (childSnapshot) => {
        AddToTheTAble(childSnapshot.val());
    });

    function AddToTheTAble(data) {
        const x = data.X;
        const y = data.Y;
        const r = data.R;
        const result = data.Result;
        const dateTime = data.Date.toLocaleString();

        const row = "<div  class='cell'>" + x + "</div>"
            + "<div class='cell'>" + y + "</div>"
            + "<div class='cell'>" + r + "</div>"
            + "<div class='cell'>" + result + "</div>"
            + "<div class='cell'>" + dateTime + "</div>";
        const table = document.getElementById("head_table");

        const el = document.createElement("div");
        el.classList.add('row');
        el.classList.add('new');
        el.innerHTML = row;
        insertAfter(table, el);
        return el;

        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
}