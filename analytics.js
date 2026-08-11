const ctx=document.getElementById('chart');
new Chart(ctx,{type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Study Hours',data:[1,2,1.5,3,2.5,4,2]}]},options:{responsive:true}});
