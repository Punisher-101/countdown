const inputContainer = document.querySelector('#input-container');
const countdownForm = document.querySelector('#countdownForm');
const dateEl = document.querySelector('#date-picker');

const countdownEl = document.querySelector('#countdown');
const countdownElTitle = document.querySelector('#countdown-title');
const countdownBtn = document.querySelector('#countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.querySelector('#complete');
const completeElInfo = document.querySelector('#complete-info');
const completeBtn = document.querySelector('#complete-button');

// GLobal Variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;
let countdownActive;
let savedCountDown;

// Getting tht Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Function to Put the elements in Span
function spanEl(elementNo, type) {
  timeElements[elementNo].textContent = `${type}`;
}

// Function - UpdateDOM()
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    countdownElTitle.textContent = `${countdownTitle}`;

    // Hide Inputs
    inputContainer.hidden = true;
    if (distance < 0) {
      // Populate Countdown
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
      countdownEl.hidden = true;
      clearInterval(countdownActive);
    } else {
      spanEl(0, days);
      spanEl(1, hours);
      spanEl(2, minutes);
      spanEl(3, seconds);
      //   Show Countdownc
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
}

// Function to take values from the Form Submition
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountDown));
  if (countdownDate === '') {
    alert('Please select the Date for the countDown.');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Function - Reset
function reset() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  //   Stop the countdown
  clearInterval(countdownActive);
  //   Resetting the values from countdowtitle
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // Get countdown from local storage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.Date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}
// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// Restoring Previous Countdown
restorePreviousCountdown();
