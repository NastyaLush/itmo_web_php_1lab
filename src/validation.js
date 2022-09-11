"use strict";

const errorY = " You should write x between -3 and 3 ";
const noError = "no-warning";
const warning = "warning";
const normal = "normal";
const error = "error";
const active = "active";
const noActive = "no-active";
const label = document.getElementById("x");
const send = document.getElementById("send");
const logX = document.getElementById("log_x");
const logY = document.getElementById("log_y");

export function validation() {
    send.classList.add("no-active")
    document.getElementById("x").addEventListener('change', (uvalue) => {
        const result = parseFloat(uvalue.target.value);
        if (!(result >= -3 && result <= 3)) {
            logX.textContent = errorY;
            changeClass(logX, noError, error);

            label.classList.add(warning);
            label.focus();

            changeClass(send, active, noActive);
            send.disabled = true;


        } else {
            if (logY.textContent == "") {
                changeClass(send, noActive, active);
                send.disabled = false;
            } else {
                changeClass(send, active, noActive);
                send.disabled = true;
            }
            changeClass(label, warning, normal);

            logX.textContent = "";
            changeClass(logX, error, noError);
        }
    });

    var checkboxes = document.querySelectorAll("input[type=checkbox][name=y]");
    let enabledY = []

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            enabledY =
                Array.from(checkboxes)
                    .filter(i => i.checked)
                    .map(i => i.textContent)
            if (enabledY.length == 1) {
                logY.textContent = "";
                changeClass(logY, error, noError);

                changeClass(send, noActive, active);
                send.disabled = false;
            } else {
                changeClass(send, active, noActive);
                send.disabled = true;

                logY.textContent = "You should choose one y";
                changeClass(logY, noError, error);

            }
        })
    });
}

function changeClass(label, oldClass, newClass) {
    label.classList.remove(oldClass);
    label.classList.add(newClass);
}