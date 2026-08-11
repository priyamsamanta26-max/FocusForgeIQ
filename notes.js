const notes=$('notes');notes.value=localStorage.getItem('ff_notes')||'';
function saveNotes(){localStorage.setItem('ff_notes',notes.value);toast('Notes saved');}
function exportNotes(){const blob=new Blob([notes.value],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='FocusForgeIQ_Notes.txt';a.click();}
notes.addEventListener('input',()=>{clearTimeout(window.nt);window.nt=setTimeout(()=>localStorage.setItem('ff_notes',notes.value),2000);});
