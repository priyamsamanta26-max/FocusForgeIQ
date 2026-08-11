let streak=JSON.parse(localStorage.getItem('ff_streak')||'{"count":0,"last":""}');
function renderStreak(){$('streakDisplay').textContent=`${streak.count} Day${streak.count===1?'':'s'}`;$('streakStat').textContent=streak.count;}
function markStudy(){const today=new Date().toISOString().split('T')[0];if(streak.last===today){toast('Already marked today');return;}const y=new Date();y.setDate(y.getDate()-1);const ys=y.toISOString().split('T')[0];streak.count=streak.last===ys?streak.count+1:1;streak.last=today;localStorage.setItem('ff_streak',JSON.stringify(streak));renderStreak();toast('Streak updated!');}
renderStreak();
