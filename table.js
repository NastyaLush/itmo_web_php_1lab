import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, ref, onChildAdded} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAk-ZpXDqAJyRHrgnlx9mTFZxeZcu00j3Q",
    authDomain: "labweb-7bb86.firebaseapp.com",
    databaseURL: "https://labweb-7bb86-default-rtdb.firebaseio.com",
    projectId: "labweb-7bb86",
    storageBucket: "labweb-7bb86.appspot.com",
    messagingSenderId: "183108193066",
    appId: "1:183108193066:web:9eb7ad5ee711e7026eac53",
    measurementId: "G-WTEGRM4YC8"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const reference = ref(database, 'data/');

onChildAdded(reference, (childSnapshot, prevChildKey) =>{
add_to_the_table(childSnapshot.val());
});

function add_to_the_table(data) {
    let formatter = new Intl.DateTimeFormat('nl-BE');
    let x = data.X;
    var y = data.Y;
    var r = data.R;
    var result = data.Result;
    var dateTime = data.Date.toLocaleString();

    let row = "";
    row += "<td>" + x
        + "</td><td>" + y
        + "</td><td>" + r
        + "</td><td>" + result
        + "</td><td>" + dateTime
        + "</td>";
    var tbody = document.querySelector("#table tbody");
    var tr = document.createElement("tr");

    tr.innerHTML = row;
    tbody.appendChild(tr)
}