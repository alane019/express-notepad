const fs = require("fs");
const path = require("path"); 
const dbDir = path.resolve(__dirname, "../db");
let notes = [];


module.exports = function(app){ 
	let notes = [];
	// serve url routes for client-side js file
	// following convention: api in url path for json files
	app.get("/api/notes", function(req, res) {

		notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);
		return res.json(notes); 
	});

	// save notes
	app.post("/api/notes", function(req, res) {
		let notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);

		console.log("\n");
		console.log(notes);
		console.log("\n");

		var i = 1; 
		notes.forEach(function(note){
			note.id = i;
			i++;
		});
		console.log("\n");
		let newNote = req.body;
		console.log(newNote);
		console.log("\n");

		newNote.id = i;
		notes.push(newNote);

		console.log("\n");
		console.log(notes);
		console.log("\n");

		notes = JSON.stringify(notes);

		console.log("\n");
		console.log("after JSON.stringify: ");
		console.log(notes);
		console.log("\n");

		fs.writeFile(path.resolve(dbDir, "db.json"), notes, function(err){
			if(err) throw err;
		});
		res.json(JSON.parse(notes));
		// save button writes note object values to json storage object, and also renders values to html display
	});

	// delete notes
	app.delete("/api/notes/:id", function(req, res) {

		let notes = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf8");
		notes = JSON.parse(notes);

		console.log("\n");
		console.log("Notes array before deletion: ");
		console.log("\n");
		console.log(notes);
		console.log("\n");

		console.log("\n");
		console.log("req.params.id: ");
		console.log("\n");
		console.log(req.params.id);
		console.log("\n");

		//check each object in array and delete if id matches request note id;
		for (const [index,element] of notes.entries()){
			if(element.id == req.params.id){
				removedNote = notes.splice(index,1);

				console.log("\n");
				console.log("Removed note: ");
				console.log("\n");
				console.log(removedNote);
				console.log("\n");

				break; 
			}
		};

			console.log("\n");
			console.log("Updated notes array: ");
			console.log("\n");
			console.log(notes);
			console.log("\n");


			notes = JSON.stringify(notes);

			console.log("\n");
			console.log("After JSON.stringify: ");
			console.log(notes);
			console.log("\n");

			fs.writeFile(path.resolve(dbDir, "db.json"), notes, function(err){
				if(err) throw err;
			});

			res.json(JSON.parse(notes));

	}); 

	//update an existing note
	

}