import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, ref, set, push, onValue} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";


import { firebaseConfig } from './config.js';
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const button = document.getElementById('send');
button.addEventListener('click', (e) => {
    const time = new Date().toUTCString();
    e.preventDefault();
    let x = parseFloat(document.getElementById('x').value).toLocaleString(3);
    const y = document.getElementById('checkbox');
    const r = document.getElementById('r').value;
    const checkedValue = document.querySelector('.y_text:checked').value;
    const result = getResult(x, checkedValue, r);

    const database = getDatabase();
    const reference = ref(database, 'data');

    set(push(reference), {
        "X": x,
        "Y": checkedValue,
        "R": r,
        "Result": result,
        "Date": time
    });

    //back all to the first condition
    document.getElementById('x').value = '';
    changeClass(document.getElementById('x'), "normal", "warning");
    changeClass(document.getElementById('log_x'), "no-warning", "error");
    changeClass(document.getElementById('log_y'), "no-warning", "error");
    document.getElementById("log_x").textContent = " You should write x between -3 and 3 ";
    document.getElementById("log_y").textContent = "You should choose one y";
    changeClass(send, "active", "no-active");
    send.disabled = true;

    let checkbox = document.getElementsByName('y');
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }
});

setTimeout(() => {
    isConnection();
}, 8000);

function isConnection() {
    const db = getDatabase();
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            console.log("connected");
        } else {
            console.log("not connected");
            alert("Please check your connection to the internet");
        }
    });
}

function between(x, x1, x2) {

    return x >= x1 && x <= x2;
}

function isInSquare(x, y, r) {

    return between(x, -r, 0) && between(y, -r, 0);
}

function isInTriangle(x, y, r) {

    return between(x, 0, r) && between(y, -(r - x), 0);
}

function isInSector(x, y, r) {
    if (between(x, -r, 0)) {
        if (between(y, 0, Math.sqrt(r ** 2 + x ** 2))) {
            return true;
        }
    }
    return false;
}

function isInShape(x, y, r) {
    return isInSector(x, y, r) || isInSquare(x, y, r) || isInTriangle(x, y, r);
}

function getResult(x, y, r) {
    if (isInShape(x, y, r)) return 'reach';
    return 'miss';
}

function changeClass(label, oldClass, newClass) {
    label.classList.remove(oldClass);
    label.classList.add(newClass);
}
