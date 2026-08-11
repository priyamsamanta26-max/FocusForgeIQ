const $=id=>document.getElementById(id);
$('todayDate').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
$('themeBtn').onclick=()=>document.documentElement.classList.toggle('dark');
function toast(msg){const t=$('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2500);}
