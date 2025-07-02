let notesList = [];

function createNote() {
  var noteTitle = document.getElementById("noteTitle").value;
  var noteText = document.getElementById("noteInput").value;
  const note = {
  title: noteTitle,
  text: noteInput
};

console.log(note);
return note;
}

createNote();