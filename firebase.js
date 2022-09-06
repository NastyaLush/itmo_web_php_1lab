import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

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
const analytics = getAnalytics(app);

const button = document.getElementById('send');


function between(x, x1, x2) {

    return x >= x1 && x <= x2;
}

function is_in_square(x, y, r) {

    return between(x, -r, 0) && between(y, -r, 0);
}

function is_in_triangle(x, y, r) {

    return between(x, 0, r) && between(y, -(r - x), 0);
}

function is_in_sector(x, y, r) {
    if (between(x, -r, 0)) {
        if (between(y, 0, Math.sqrt(r ** 2 + x ** 2))) {
            return true;
        }
    }
    return false;
}

function is_in_shape(x, y, r) {
    return is_in_sector(x, y, r) || is_in_square(x, y, r) || is_in_triangle(x, y, r);
}

function get_result(x, y, r) {
    if (is_in_shape(x, y, r)) return 'reach';
    return 'miss';
}


button.addEventListener('click', (e) => {
    const time = new Date().toUTCString();
    e.preventDefault();
    const x = parseFloat(document.getElementById('x').value).toLocaleString(3);
    const y = document.getElementById('checkbox');
    const r = document.getElementById('r').value;
    const checkedValue = document.querySelector('.y_text:checked').value;
    const result = get_result(x, checkedValue, r);

    const database = getDatabase();
    const reference = ref(database, 'data');

    set(push(reference), {
        "X": x,
        "Y": checkedValue,
        "R": r,
        "Result": result,
        "Date": time
})
    ;
});