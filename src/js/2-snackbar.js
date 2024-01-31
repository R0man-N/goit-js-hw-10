import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = this.querySelector('[name="delay"]');
  const stateRadio = this.querySelector('[name="state"]:checked');

  const delay = parseInt(delayInput.value, 10);

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid positive delay value',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    if (stateRadio.value === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise.then(
    result => {
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    },
    error => {
      iziToast.error({
        title: 'Rejected',
        message: `❌ Rejected promise in ${error}ms`,
      });
    }
  );
});
