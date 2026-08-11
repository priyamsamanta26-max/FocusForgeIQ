/* FocusForgeIQ - Ultra Advanced Custom Pomodoro */

let studyMinutes = parseInt(localStorage.getItem('ff_study_minutes') || '25');
let breakMinutes = parseInt(localStorage.getItem('ff_break_minutes') || '5');

let currentMinutes = studyMinutes;
let timeLeft = currentMinutes * 60;
let timerId = null;
let isBreak = false;

// Set saved values in inputs
document.getElementById('studyInput').value = studyMinutes;
document.getElementById('breakInput').value = breakMinutes;

function renderTimer() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');

  document.getElementById('timer').textContent = `${m}:${s}`;
}

function applyCustomTime() {

  const study = parseInt(document.getElementById('studyInput').value);
  const brk = parseInt(document.getElementById('breakInput').value);

  if (isNaN(study) || study < 1 || study > 300) {
    alert('Study time must be between 1 and 300 minutes');
    return;
  }

  if (isNaN(brk) || brk < 1 || brk > 120) {
    alert('Break time must be between 1 and 120 minutes');
    return;
  }

  studyMinutes = study;
  breakMinutes = brk;

  localStorage.setItem('ff_study_minutes', studyMinutes);
  localStorage.setItem('ff_break_minutes', breakMinutes);

  pauseTimer();

  isBreak = false;
  currentMinutes = studyMinutes;
  timeLeft = currentMinutes * 60;

  document.getElementById('timerMode').textContent = 'Mode: Study';

  renderTimer();

  if (typeof toast === 'function') {
    toast(`Custom timer set: ${studyMinutes}m study / ${breakMinutes}m break`);
  }
}

function startTimer() {

  if (timerId) return;

  timerId = setInterval(() => {

    timeLeft--;

    renderTimer();

    if (timeLeft <= 0) {

      clearInterval(timerId);
      timerId = null;

      if (!isBreak) {

        // Study completed
        let sessions = parseInt(localStorage.getItem('ff_sessions') || '0') + 1;
        localStorage.setItem('ff_sessions', sessions);

        const stat = document.getElementById('sessionStat');
        if (stat) stat.textContent = sessions;

        if (typeof toast === 'function') {
          toast('Study session completed! Break started.');
        } else {
          alert('Study session completed! Break started.');
        }

        isBreak = true;
        currentMinutes = breakMinutes;
        timeLeft = currentMinutes * 60;

        document.getElementById('timerMode').textContent = 'Mode: Break';

      } else {

        // Break completed
        if (typeof toast === 'function') {
          toast('Break completed! Study session ready.');
        } else {
          alert('Break completed! Study session ready.');
        }

        isBreak = false;
        currentMinutes = studyMinutes;
        timeLeft = currentMinutes * 60;

        document.getElementById('timerMode').textContent = 'Mode: Study';
      }

      renderTimer();
    }

  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {

  pauseTimer();

  currentMinutes = isBreak ? breakMinutes : studyMinutes;
  timeLeft = currentMinutes * 60;

  renderTimer();
}

// Initial render
renderTimer();

// Load session count
const sessionStat = document.getElementById('sessionStat');
if (sessionStat) {
  sessionStat.textContent = localStorage.getItem('ff_sessions') || '0';
}
