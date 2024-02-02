import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');

const display = {
  daysDisplay: document.querySelector('[data-days]'),
  hoursDisplay: document.querySelector('[data-hours]'),
  minutesDisplay: document.querySelector('[data-minutes]'),
  secondsDisplay: document.querySelector('[data-seconds]'),
};

let periodId;
let userSelectedDate;

startButton.disabled = true;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  periodId = setInterval(() => {
    const timeNow = Date.now();
    const timeDifference = userSelectedDate - timeNow;
    const formattedTime = convertMs(timeDifference);
    displayFormattedTime(formattedTime);
    console.log(timeDifference);
    if (timeDifference < 1000) {
      clearInterval(periodId);
    }
  }, 1000);
});

const displayFormattedTime = ({ days, hours, minutes, seconds }) => {
  display.daysDisplay.textContent = String(days).padStart(2, 0);
  display.hoursDisplay.textContent = String(hours).padStart(2, 0);
  display.minutesDisplay.textContent = String(minutes).padStart(2, 0);
  display.secondsDisplay.textContent = String(seconds).padStart(2, 0);
};

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

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  maxDate: new Date().fp_incr(30),

  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();

    if (!selectedDate || selectedDate < currentDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }

    userSelectedDate = selectedDate;
    startButton.disabled = false;

    clearInterval(periodId);
    displayFormattedTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  },
};

flatpickr('input#datetime-picker', options);
