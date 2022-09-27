import {initializeApp} from 'firebase/app';
import {getDatabase, ref, set, push, onValue} from "firebase/database";
import * as constants from "./utilConstants";
export function initialisation(firebaseConfig) {
    initializeApp(firebaseConfig);
    const button = document.getElementById(constants.send);
    button.addEventListener(constants.click,
        (e) => {
            const time = new Date().toUTCString();
            e.preventDefault();
            const x = parseFloat(document.getElementById(constants.x).value).toLocaleString(3);
            const r = document.getElementById(constants.y).value;
            const checkedValue = document.querySelector('.y_text:checked').value;
            const result = getResult(x, checkedValue, r);

            const database = getDatabase();
            const reference = ref(database);

            set(push(reference), {
                "X": x,
                "Y": checkedValue,
                "R": r,
                "Result": result,
                "Date": time
            });

            //back all to the first condition
            const logX = document.getElementById(constants.logX);
            const logY = document.getElementById(constants.logY);
            document.getElementById(constants.x).value = constants.withOutError;
            changeClass(document.getElementById(constants.x), constants.normal, constants.warning);
            changeClass(logX, constants.noError, constants.error);
            changeClass(logY, constants.noError, constants.error);
            logX.textContent = constants.errorX;
            logY.textContent = constants.errorY;
            changeClass(constants.send, constants.active, constants.noActive);
            constants.send.disabled = true;

            const checkbox = document.getElementsByName(constants.y);
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false;
            }
        });

    setTimeout(() => {
        isConnection();
    }, 8000);
}

function isConnection() {
    const db = getDatabase();
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
        if (!(snap.val() === true)) {
            alert(constants.connectionError);
        }
    });
}

function between(arg, downArg, highArg) {

    return arg >= downArg && arg <= highArg;
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
    if (isInShape(x, y, r)) return constants.reach;
    return constants.miss;
}

function changeClass(label, oldClass, newClass) {
    label.classList.remove(oldClass);
    label.classList.add(newClass);
}
