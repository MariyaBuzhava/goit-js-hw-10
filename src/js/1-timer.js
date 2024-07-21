import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerInterval;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.warning({ message: "Please choose a date in the future" });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const timeLeft = userSelectedDate - new Date();
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    datetimePicker.disabled = false;
    iziToast.info({ message: "Time's up!" });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

startBtn.disabled = true;

// document.addEventListener('DOMContentLoaded', () => {
//     const savedDate = localStorage.getItem('selectedDate');
//     if (savedDate) {
//         userSelectedDate = new Date(savedDate);
//         datePicker._flatpickr.setDate(userSelectedDate);
//         startBtn.disabled = userSelectedDate <= new Date();
//     }
// });

// startBtn.addEventListener('click', () => {
//     if (!userSelectedDate) return;
//     startCountdown(userSelectedDate);
// });

// function startCountdown(targetDate) {
//     const intervalId = setInterval(() => {
//         const now = new Date().getTime();
//         const distance = targetDate - now;

//         if (distance < 0) {
//             clearInterval(intervalId);
//             console.log("Countdown finished");
//             localStorage.removeItem('selectedDate');
//             return;
//         }

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);
// }





// if (userSelectedDate && userSelectedDate > new Date()) {
//   startBtn.disabled = false;
// }


