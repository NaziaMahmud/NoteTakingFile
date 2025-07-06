import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

let notes = [];
let noteidser = 1;
//send html file when opening server
app.get("/", function (req, res) {
  console.log("testing1");
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(notes);
});
//add note to back end notes list
app.post("/api/notes", function (req, res) {
  console.log(req.body);
  const { title, text, noteid } = req.body;
  noteidser = noteid;
  const newNote = {
    title,
    text,
    noteid,
  };
  //push note to list
  notes.push(newNote);
  res.status(201).json(newNote);
  console.log(notes + "added");
});

//updates notes if same title or same note
app.put("/api/notes", function (req, res) {
  console.log("testing");
  const { title, text, noteid } = req.body;
  const newNote = {
    title,
    text,
    noteid,
  };
  //loop through list
  //if title matches update text
  for (let i = 0; i < notes.length; i++) {
    if (newNote.title === notes[i].title) {
      notes[i].text = newNote.text;
    }
  }
  res.status(200).json(newNote);
});

//delete note when pressing trash can
app.delete("/api/notes/:id", function (req, res) {
  console.log("testing");
  //get title of note to delete
  const noteIdToDelete = req.params.id;
  //loop through note list and delete note with matching title
  for (let i = 0; i < notes.length; i++) {
    if (noteIdToDelete === notes[i].title) {
      notes.splice(i, 1);
    }
  }
  res.status(200).json(newNote);
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
