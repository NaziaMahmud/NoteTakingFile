let notesList = [];
let noteid = 0;
function createNote() {
  var noteTitle = document.getElementById("noteTitle").value;
  var noteText = document.getElementById("noteInput").value;
  const note = {
    title: noteTitle,
    text: noteText,
    noteid: noteid,
  };
  noteid++;

  console.log(note);
  return note;
}
// Fetch notes when page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/notes")
    .then((response) => response.json())
    .then((data) => {
      console.log("Loaded notes:", data);

      notesList = data; // ✅ Update your local notesList

      data.forEach((note) => {
        //adds button for each loaded note
        const btn = document.createElement("button");
        btn.id = `tab${note.noteid}`;
        btn.textContent = note.title;
        btn.classList.add("butt");

        // Create the delete span
        const del = document.createElement("span");
        del.textContent = "🗑️"; // Or "🗑️"

        del.dataset.noteid = note.noteid; // So you know which note to delete
        //<button id="tab(somenumber)" class="butt"> title <span>trashcan</span></button>
        // Add both to the button

        btn.appendChild(del);

        document.querySelector(".button-container").appendChild(btn);
      });
    })
    .catch((error) => console.error("Error loading notes:", error));
});

// ✅ Use event delegation to handle all note buttons -> create functionality for all tabs on side
document
  .querySelector(".button-container")
  .addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const clickedTitle = event.target.textContent.replace("🗑️", "");

      const note = notesList.find((n) => n.title === clickedTitle);
      if (note) {
        //displays note data
        document.querySelector("#noteTitle").value = note.title;
        document.querySelector("#noteInput").value = note.text;
      }
    }
    if (event.target.tagName === "SPAN") {
      const clickedTitle = event.target
        .closest("button")
        .textContent.replace("🗑️", "");

      const note = notesList.find((n) => n.title === clickedTitle);
      if (note) {
        const index = notesList.findIndex((n) => n.title === clickedTitle);
        notesList.splice(index, 1); //delete note from front end
        document.querySelector(`#tab${note.noteid}`).remove();
        //delete note from back end
        fetch(`/api/notes/${clickedTitle}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Note saved:", data);
          })
          .catch((error) => {
            console.error("Error saving note:", error);
          });
      }
    }
  });

document.querySelector("#noteForm").addEventListener("submit", (event) => {
  event.preventDefault();
});
document
  .querySelector("button[type='submit']")
  .addEventListener("click", (event) => {
    event.preventDefault();
    for (let i = 0; i < notesList.length; i++) {
      if (notesList[i].title === document.getElementById("noteTitle").value) {
        notesList[i].text = document.getElementById("noteInput").value;
        let newNote2 = createNote();
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteInput").value = "";
        //update note content if same title
        fetch("/api/notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote2), // or JSON.stringify(notesList)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Note saved:", data);
          })
          .catch((error) => {
            console.error("Error saving note:", error);
          });
        return;
      }
    }

    let newNote = createNote();
    //update new note to server

    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote), // or JSON.stringify(notesList)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note saved:", data);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
    //update note to front end
    notesList.push(newNote);
    // create buttons for new note created
    const btn = document.createElement("button");
    btn.id = `tab${newNote.noteid}`;
    btn.classList.add("butt");
    btn.textContent = newNote.title;
    const del = document.createElement("span");
    del.textContent = "🗑️"; // Or "🗑️"

    del.dataset.noteid = newNote.noteid;
    btn.appendChild(del);

    document.querySelector(".button-container").appendChild(btn);

    // Add listener directly to this button
    btn.addEventListener("click", (event) => {
      let noteposition = 0;
      for (let i = 0; i < notesList.length; i++) {
        if (notesList[i].title === event.target.innerHTML) {
          noteposition = i;
        }
      }
      document.querySelector("#noteTitle").value =
        event.target.innerHTML.replace("🗑️", "");
      document.querySelector("#noteInput").value = notesList[noteposition].text;
    });
    document.querySelector("#noteTitle").value = "";
    document.querySelector("#noteInput").value = "";
  });
