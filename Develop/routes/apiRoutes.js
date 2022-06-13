var noteArray = require("../db/db.json");
var fs = require("fs");
var path = require("path");

module.exports = function(app) {

// Get route - reads from db.json
app.get("/api/notes", function(req, res) {
    res.json(noteArray);
  });

// Post route - post to db.json
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  noteArray.push(newNote);

// Add ID property to each new note
  uniqueID(noteArray);

// Write new JSON file with updated array
  fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteArray), (err) => {
    if (err) {
      console.log("file not updated");
    } else {
      console.log("file updated");
    }
  })
  res.json(newNote);
  
  });

  // Function to add ID to new note
var uniqueID = function(arr) {
  for (i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
}

// Delete route - deletes from db.json
app.delete("/api/notes/:id", function(req, res) {
  
// Looking for note with corresponding ID  
  var noteID = req.params.id;
    for (i = 0; i < noteArray.length; i++) {
      if (noteID == noteArray[i].id) {
        noteArray.splice(i, 1);
      }
    }

// Put the new array through the Unique ID function
  uniqueID(noteArray);

// Rewrite the db.json file
  fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteArray), (err) => {
    if (err) {
      console.log("file not updated");
    } else {
      console.log("file updated");
    }
  })
    res.json(noteID);
  })

};







  