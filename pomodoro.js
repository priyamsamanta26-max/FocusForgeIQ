let timeLeft=25*60,timerId=null,currentMinutes=25;
function renderTimer(){const m=String(Math.floor(timeLeft/60)).padStart(2,'0');const s=String(timeLeft%60).padStart(2,'0');$('timer').textContent=`${m}:${s}`;}
function setMode(m){pauseTimer();currentMinutes=m;timeLeft=m*60;renderTimer();}
function startTimer(){if(timerId)return;timerId=setInterval(()=>{timeLeft--;renderTimer();if(timeLeft<=0){clearInterval(timerId);timerId=null;let s=parseInt(localStorage.getItem('ff_sessions')||'0')+1;localStorage.setItem('ff_sessions',s);$('sessionStat').textContent=s;toast('Pomodoro completed!');setMode(25);}},1000);}
function pauseTimer(){clearInterval(timerId);timerId=null;}
function resetTimer(){pauseTimer();timeLeft=currentMinutes*60;renderTimer();}
$('sessionStat').textContent=localStorage.getItem('ff_sessions')||0;renderTimer();
