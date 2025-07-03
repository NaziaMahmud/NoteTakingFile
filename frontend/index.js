let notesList = [];

function createNote() {  
  var noteTitle = document.getElementById("noteTitle").value;
  var noteText = document.getElementById("noteInput").value;
  const note = {
  title: noteTitle,
  text: noteText
};

console.log(note);
return note;
}

document.querySelector("button[type='submit']").addEventListener('click', (event)=>{
  event.preventDefault();
  let newNote=createNote();

  fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newNote) // or JSON.stringify(notesList)
})
.then(response => response.json())
.then(data => {
  console.log('Note saved:', data);
})
.catch(error => {
  console.error('Error saving note:', error);
});
document.querySelector(".button-container").innerHTML += `<div id="tabs">${newNote.title}</div>`
});

