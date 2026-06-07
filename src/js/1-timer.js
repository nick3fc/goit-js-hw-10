//  імпорт бібліотеки flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//  імпорт бібліотеки iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let selectedDateTime = null;
let currentDateTime = null;
let timeDifference = null;

let daysUpd = document.querySelector('[data-days]');
let hoursUpd = document.querySelector('[data-hours]');
let minutesUpd = document.querySelector('[data-minutes]');
let secondsUpd = document.querySelector('[data-seconds]');
// let milisecondsUpd = document.querySelector('[data-miliseconds]');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM готовий');

  const dateInput = document.querySelector('#datetime-picker');
  const StartBtn = document.querySelector('.input-wrapper button');

  StartBtn.disabled = true;
  //   console.log('кнопка вимкнена');

  // обробник кліку на кнопку старту зворотнього відліку
  StartBtn.addEventListener('click', () => {
    console.log('запуск зворотнього відліку');
    // currentDateTime = new Date();
    timeDifference = calcTimeDifference(selectedDateTime[0]);
    //   const timeDifference = selectedDateTime[0] - currentDateTime;
    //   console.log(timeDifference);
    StartBtn.disabled = true;
    dateInput.disabled = true;
    // перерахунок та оновлення каунтера кожну секунду;
    let intervalID = setInterval(() => {
      //   calcTimeDifference(selectedDateTime[0]);
      let remainingTime = calcTimeDifference(selectedDateTime[0]);
      if (remainingTime > 1000) {
        //компенсація зайвої затримки в 1 секунду (КРОК 1 - 1000 замість 0)
        updateCounter(convertMs(calcTimeDifference(selectedDateTime[0])));
      } else {
        console.log('зворотній відлік завершено');
        clearInterval(intervalID);
        updateCounter(convertMs(calcTimeDifference(selectedDateTime[0])));
        //компенсація зайвої затримки в 1 секунду (КРОК 2 - повторне оновлення каунтера для встановлення секунд в 00)
        // StartBtn.disabled = false;
        dateInput.disabled = false;
        // alert('Finished! Choose a new date to start new countdown');
        iziToast.show({
          balloon: true,
          closeOnEscape: true,
          closeOnClick: true,
          backgroundColor: 'green',
          theme: 'light', // dark
          position: 'topRight',
          title: 'Finished:',
          message: 'choose a new date to strt new countdown',
        });
      }
    }, 1000);
  });

  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: 'Y-m-d H:i',

    onClose: function (selected, dateStr, instance) {
      selectedDateTime = selected;
      //   console.log(selectedDateTime);
      console.log('точка відліку обрана: ', dateStr);
      currentDateTime = new Date();
      //   console.log(currentDateTime);

      if (selectedDateTime[0] > currentDateTime) {
        StartBtn.disabled = false;
      } else {
        StartBtn.disabled = true;
        console.log(
          'Обрані дата і час менші за поточні. Виберіть дату і час у майбутньому.'
        );
        // alert('Please choose a date in the future')
        iziToast.show({
          balloon: true,

          closeOnEscape: true,
          closeOnClick: true,
          backgroundColor: 'red',
          theme: 'light', // dark
          position: 'topRight',
          title: 'Error input:',
          message: 'Please choose a date in the future',
        });
      }
    },
  });
  console.log('flatpickr готовий');
});
// -------------- функції --------------
// функція обраховує різницю між вибраною датою та поточною датою в мілісекундах
function calcTimeDifference(selectedTime) {
  //   currentTime = new Date();
  //   timeDifference = selectedTime - currentTime;
  //   console.log('timeDifference: ', selectedTime - new Date());
  return selectedTime - new Date();
}
// функція конвертує мілісекунди в об'єкт з днями, годинами, хвилинами та секундами
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  //   console.log('ffff: ', days, hours, minutes, seconds);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
// функція оновлює вміст каунтера в html відповідно до обрахованого часу
function updateCounter({ days, hours, minutes, seconds }) {
  // function updateCounter({ days, hours, minutes, seconds, miliseconds }) {
  daysUpd.textContent = addPad(days);
  //   daysUpd.textContent = days;
  hoursUpd.textContent = addPad(hours);
  minutesUpd.textContent = addPad(minutes);
  secondsUpd.textContent = addPad(seconds);
  // milisecondsUpd.textContent = addPad(miliseconds);
}
// функція приводить числові значення до формату з двома розрядами
function addPad(padValue) {
  return padValue.toString().padStart(2, '0');
}
