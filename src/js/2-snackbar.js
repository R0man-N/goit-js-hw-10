import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = event.target.elements['delay'];
  const stateRadio = event.target.elements['state'].value;

  const delay = parseInt(delayInput.value, 10);

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid positive delay value',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateRadio === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
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
}
