//  імпорт бібліотеки iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM готовий');

  const formSubmit = document.querySelector('.form');
  //   console.log('форма знайдена');
  formSubmit.addEventListener('submit', event => {
    // console.log('форма відправлена');
    event.preventDefault();

    const formDelay = Number(formSubmit.elements.delay.value);
    const formState = formSubmit.elements.state.value;

    formSubmit.reset();
    // console.log('formDelay: ', formDelay);
    // console.log('formState: ', formState);

    const submittedPromise = new Promise((resolve, reject) => {
      //   console.log('проміс створено');
      setTimeout(() => {
        switch (formState) {
          case 'fulfilled':
            resolve(formDelay);
            // console.log('resolve: ', formDelay);
            break;
          case 'rejected':
            reject(formDelay);
            // console.log('reject: ', formDelay);
            break;
        }
      }, formDelay);
    });
    // console.log('обробка проміса');
    submittedPromise
      .then(value => {
        iziToast.show({
          balloon: true,
          closeOnEscape: true,
          closeOnClick: true,
          backgroundColor: 'green',
          theme: 'light', // dark
          position: 'topRight',
          title: '✅',
          message: `Fulfilled promise in ${value}ms`,
        });
      })
      .catch(error => {
        iziToast.show({
          balloon: true,
          closeOnEscape: true,
          closeOnClick: true,
          backgroundColor: 'red',
          theme: 'light', // dark
          position: 'topRight',
          title: '❌',
          message: `Rejected promise in ${error}ms`,
        });
      });
  });
});
