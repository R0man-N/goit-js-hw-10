import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  let userSelectedDate;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();

      if (userSelectedDate < currentDate) {
        document.querySelector('[data-start]').disabled = true;
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  document.querySelector('[data-start]').addEventListener('click', function () {
    this.disabled = true;

    const intervalId = setInterval(function () {
      const currentDate = new Date();
      const timeDifference = userSelectedDate - currentDate;

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        updateTime(0);
        iziToast.success({
          title: 'Success',
          message: 'Timer reached zero!',
        });
      } else {
        updateTime(timeDifference);
      }
    }, 1000);
  });

  function updateTime(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }

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
    return value < 10 ? `0${value}` : value;
  }
});
