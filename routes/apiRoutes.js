const fs = require("fs");
const path = require("path"); 
const dbDir = path.resolve(__dirname, "../db");
let notes = [];

module.exports = function(app){ 
	let notes = [];
	// serve url routes for client-side js file
	// following convention: api in url path for json files
	// VIEW notes
	app.get("/api/notes", function(req, res) {

		notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);
		return res.json(notes); 
	});


	// SAVE new note
	app.post("/api/notes", (req, res) => {
		let notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);

		let nextNoteId = 1; 
		notes.forEach(note => {
			note.id = nextNoteId;
			nextNoteId++;
		});

		let newNote = req.body;
		newNote.id = nextNoteId;
		notes.push(newNote);
		notes = JSON.stringify(notes);

		fs.writeFile(path.resolve(dbDir, "db.json"), notes, function(err){
			if(err) throw err;
		});
		res.json(JSON.parse(notes));
		// save button writes note object values to json storage object, and also renders values to html display
	});

	// DELETE notes
	app.delete("/api/notes/:id", function(req, res) {
		let notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);
		//check each object in array and delete if id matches request note id;
		for (const [index,element] of notes.entries()){
			if(element.id == req.params.id){
				removedNote = notes.splice(index,1);
				break; 
			}
		};
			notes = JSON.stringify(notes);
			fs.writeFile(path.resolve(dbDir, "db.json"), notes, function(err){
				if(err) throw err;
			});
			res.json(JSON.parse(notes));
	}); 

	//update an existing note
	// EDIT note
	app.patch("/api/notes/", function (req, res) {
		let notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);
		let note = req.body;
		for (const [index,element] of notes.entries()){
			if(element.id == note.id){
			  notes[index].title = note.title;
			  notes[index].text = note.text;
			  break; 
			}
		};
		// prep array of objects for write to JSON file
		notes = JSON.stringify(notes);
		// write updated notes object array to JSON file w/ node function
		fs.writeFile(path.resolve(dbDir, "db.json"), notes, function(err){
			if(err) throw err;
		});
		// return notes to client in JSON format format to render to page.
		res.json(JSON.parse(notes));
	});

}