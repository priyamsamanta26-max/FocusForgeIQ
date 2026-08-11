let tasks=JSON.parse(localStorage.getItem('ff_tasks')||'[]');
function renderTasks(){$('taskList').innerHTML='';tasks.forEach((t,i)=>{const d=document.createElement('div');d.className='item';d.innerHTML=`<span style="${t.done?'text-decoration:line-through':''}">${t.title}</span><div class="row"><button onclick="toggleTask(${i})">${t.done?'Undo':'Done'}</button><button onclick="deleteTask(${i})">Delete</button></div>`;$('taskList').appendChild(d);});$('taskStat').textContent=tasks.length;}
function addTask(){const title=$('taskInput').value.trim();if(!title)return;tasks.push({title,done:false});localStorage.setItem('ff_tasks',JSON.stringify(tasks));$('taskInput').value='';renderTasks();}
function toggleTask(i){tasks[i].done=!tasks[i].done;localStorage.setItem('ff_tasks',JSON.stringify(tasks));renderTasks();}
function deleteTask(i){tasks.splice(i,1);localStorage.setItem('ff_tasks',JSON.stringify(tasks));renderTasks();}
renderTasks();
