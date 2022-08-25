"use strict";
const label = document.getElementById("x");
const send = document.getElementById("send");
send.classList.add("no-active")
document.getElementById("x").addEventListener('change', (uvalue)=>{
  const  result=parseFloat(uvalue.target.value);
  if(!(result>=-3 && result<=3)){
    document.getElementById("log_x").textContent= " You should write x between -3 and 3 ";
    label.classList.add("warning");
    send.classList.add("no-active")
    send.classList.remove("active")
    label.focus();
    document.getElementById("send").enabled=true;
  }
  else {
    label.classList.remove("warning");
    if( document.getElementById("log_y").textContent == "") {
      send.classList.remove("active")
      send.classList.add("no-active")
    } else {
      send.classList.add("active")
      send.classList.remove("no-active")
    }
    label.classList.add("normal");
    document.getElementById("log_x").textContent= "";
  }
});

var checkboxes = document.querySelectorAll("input[type=checkbox][name=y]");
let enabledY = []

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledY =
      Array.from(checkboxes)
        .filter(i => i.checked)
        .map(i => i.textContent)
    if(enabledY.length==1){
      document.getElementById("log_y").textContent= "";
      send.classList.remove("no-active")
    } else{
      send.classList.add("no-active")
      document.getElementById("log_y").textContent= "You should choose one y";
    }
  })
});
