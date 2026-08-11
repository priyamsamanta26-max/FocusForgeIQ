let exams=JSON.parse(localStorage.getItem('ff_exams')||'[]');
function renderExams(){$('examList').innerHTML='';exams.sort((a,b)=>new Date(a.date)-new Date(b.date));exams.forEach((e,i)=>{const days=Math.ceil((new Date(e.date)-new Date())/86400000);const d=document.createElement('div');d.className='item';d.innerHTML=`<div><strong>${e.name}</strong><br><small>${e.date} • ${days} days left</small></div><button onclick="removeExam(${i})">Delete</button>`;$('examList').appendChild(d);});$('examStat').textContent=exams.length;}
function addExam(){const name=$('examName').value.trim();const date=$('examDate').value;if(!name||!date)return;exams.push({name,date});localStorage.setItem('ff_exams',JSON.stringify(exams));$('examName').value='';$('examDate').value='';renderExams();}
function removeExam(i){exams.splice(i,1);localStorage.setItem('ff_exams',JSON.stringify(exams));renderExams();}
renderExams();
