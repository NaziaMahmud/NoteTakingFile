let notesList = [];
let noteid = 0;
function createNote() {  
  var noteTitle = document.getElementById("noteTitle").value;
  var noteText = document.getElementById("noteInput").value;
  const note = {
  title: noteTitle,
  text: noteText,
  noteid: noteid

};
noteid ++ ;

console.log(note);
return note;
}
// Fetch notes when page loads
window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/notes')
    .then(response => response.json())
    .then(data => {
      console.log('Loaded notes:', data);

      notesList = data; // ✅ Update your local notesList

      data.forEach(note => {
        const btn = document.createElement('button');
        btn.id = `tab${note.noteid}`;
        btn.textContent = note.title;

        document.querySelector(".button-container").appendChild(btn);
      });
    })
    .catch(error => console.error('Error loading notes:', error));
});

// ✅ Use event delegation to handle all note buttons
document.querySelector(".button-container").addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const clickedTitle = event.target.textContent;

    const note = notesList.find(n => n.title === clickedTitle);
    if (note) {
      document.querySelector("#noteTitle").value = note.title;
      document.querySelector("#noteInput").value = note.text;
    }
  }
});


document.querySelector("#noteForm").addEventListener('submit', (event) => {
  event.preventDefault();})
document.querySelector("button[type='submit']").addEventListener('click', (event)=>{
  event.preventDefault();
  for (let i = 0; i < notesList.length; i++) {
    if (notesList[i].title === document.getElementById("noteTitle").value) {
      alert('need unique title');
      return
    }
  }
  
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
notesList.push(newNote);
// Instead of innerHTML += ...
const btn = document.createElement('button');
btn.id = `tab${newNote.noteid}`;
btn.classList.add("butt");  
btn.textContent = newNote.title;

document.querySelector(".button-container").appendChild(btn);


// Add listener directly to this button
btn.addEventListener('click', (event) => {
  let noteposition = 0;
  for (let i = 0; i < notesList.length; i++) {
    if (notesList[i].title === event.target.innerHTML) {
      noteposition = i;
    }
  }
  document.querySelector("#noteTitle").value = event.target.innerHTML;
  document.querySelector("#noteInput").value = notesList[noteposition].text;
});

document.querySelector(".button-container").appendChild(btn);

});
asdfghjkl