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

app.get("/", function (req, res) {
  console.log("testing1");
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
  
});

app.get("/api/notes", function(req,res){
res.json(notes);
});

app.post("/api/notes", function(req,res){
  console.log(req.body);
  const {title, text, noteid} = req.body;
  noteidser = noteid;
  const newNote = {
    title, text, noteid
  }
  notes.push(newNote);
  res.status(201).json(newNote);
  console.log(notes+"added");
  });
app.put("/", function (req, res) {
  console.log("testing");
  res.sendFile(path.join(__dirname,"frontend", "index.html"));
});
app.delete("/", function (req, res) {
  console.log("testing");
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
