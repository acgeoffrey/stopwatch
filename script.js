"use strict";

//Selecting the elements
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const millisecondEl = document.getElementById("millisecond");

const lapseTextEl = document.getElementsByClassName("lap-text");

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let isTimerOn = false;

let lapseCount = 0;
let lapseArr = [];
let isStartClickedAgain = false;

startEl.addEventListener("click", function () {
  if (!isTimerOn) {
    //Not to trigger to function repeatedly
    isTimerOn = true;
    isStartClickedAgain = true;
    timer();
  }
});

stopEl.addEventListener("click", function () {
  isTimerOn = false;
  if (isStartClickedAgain) {
    isStartClickedAgain = false;

    if (minute == 0) {
      lapseArr.unshift(`${second}s ${millisecond}ms`);
    } else if (hour == 0) {
      lapseArr.unshift(`${minute}m ${second}s ${millisecond}ms`);
    } else {
      lapseArr.unshift(`${hour}Hr ${minute}Min ${second}Sec`);
    }

    for (let i = 0; i < lapseArr.length; i++) {
      lapseTextEl[i].textContent = lapseArr[i];
    }
    lapseTextEl[lapseCount].style.borderBottom = "2px solid #383244a1";
    lapseCount++;
  }
});

resetEl.addEventListener("click", function () {
  isTimerOn = false;
  isStartClickedAgain = false;
  lapseCount = 0;
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  hourEl.innerHTML = "00";
  minuteEl.innerHTML = "00";
  secondEl.innerHTML = "00";
  millisecondEl.innerHTML = "0";

  for (let i = 0; i < lapseTextEl.length; i++) {
    lapseArr = [];
    lapseTextEl[i].textContent = "";
    lapseTextEl[i].style.borderStyle = "none";
  }
});

function timer() {
  if (isTimerOn) {
    millisecond++;

    if (millisecond == 10) {
      second++;
      millisecond = 0;
    }
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }

    let hourText = hour;
    let minuteText = minute;
    let secondText = second;
    let millisecondText = millisecond;

    //Display double digit even if the variables are single digit.
    if (hour < 10) {
      hourText = "0" + hourText;
    }

    if (minute < 10) {
      minuteText = "0" + minuteText;
    }

    if (second < 10) {
      secondText = "0" + secondText;
    }

    hourEl.innerHTML = hourText;
    minuteEl.innerHTML = minuteText;
    secondEl.innerHTML = secondText;
    millisecondEl.innerHTML = millisecondText;

    setTimeout(timer, 100); //Calling this function again and again every 100ms and making it recursive until the isTimerOn is false.
  }
}
