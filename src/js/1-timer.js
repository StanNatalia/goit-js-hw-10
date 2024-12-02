import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import pathIcon from "../img/icon-error.svg";


let userSelectedDate;


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

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
         userSelectedDate = selectedDates[0];
         const currentDate = new Date();

         if (userSelectedDate <= currentDate) {
            iziToast.show({
                title: 'Error',
                theme: 'dark',
                titleColor: 'white',
                close: true,
                titleSize: '16px', 
                titleLineHeight: '150%',            
                messageSize: '16px', 
                color: 'white',
                iconUrl: pathIcon,
                backgroundColor: "#ef4040",
                messageColor: "white",
                message: "Please choose a date in the future",
                position: 'topRight',
                timeout: 10000
            });
            startButton.disabled = true;
         } else {
            startButton.disabled = false;
         }
    },
  };

flatpickr("input#datetime-picker", options);

const startButton = document.querySelector("[data-start]");
const datetimePicker = document.getElementById("datetime-picker");
startButton.disabled = true;

startButton.addEventListener("click", () => {
    startCountdown(userSelectedDate);
});

function startCountdown(targetDate) {
        if (!targetDate) return;
        datetimePicker.disabled = true;
        startButton.disabled = true;

    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("Time's up!");
            datetimePicker.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        updateTimerInterface(days, hours, minutes, seconds);
    }, 1000);
}


function updateTimerInterface(days, hours, minutes, seconds) {
    const timerDisplay = document.querySelector(".timer");


    const daysElement = timerDisplay.querySelector("[data-days]");
    const hoursElement = timerDisplay.querySelector("[data-hours]");
    const minutesElement = timerDisplay.querySelector("[data-minutes]");
    const secondsElement = timerDisplay.querySelector("[data-seconds]");


    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}
  


