"use strict";

    const label = document.getElementById("x");
    const send = document.getElementById("send");
    const log_x = document.getElementById("log_x");
    const log_y = document.getElementById("log_y");
    send.classList.add("no-active")
    document.getElementById("x").addEventListener('change', (uvalue) => {
        const result = parseFloat(uvalue.target.value);
        if (!(result >= -3 && result <= 3)) {
            log_x.textContent = " You should write x between -3 and 3 ";
            change_class(log_x, "no-warning", "error");

            label.classList.add("warning");
            label.focus();

            change_class(send, "active", "no-active");
            document.getElementById("send").enabled = true;
        } else {
            if (document.getElementById("log_y").textContent == "") {
                change_class(send, "active", "no-active");
            } else {
                change_class(send, "no-active", "active");
            }
            label.classList.remove("warning");
            label.classList.add("normal");

            document.getElementById("log_x").textContent = "";
            change_class(log_x, "error", "no-warning");
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
                document.getElementById("log_y").textContent = "";
                change_class(log_y, "error", "no-warning");

                change_class(send, "no-active", "active");
            } else {
                change_class(send, "active", "no-active");

                document.getElementById("log_y").textContent = "You should choose one y";
                change_class(log_y, "no-warning", "error");

            }
        })
    });


function change_class(label, old_class, new_class) {
    label.classList.remove(old_class);
    label.classList.add(new_class);
}