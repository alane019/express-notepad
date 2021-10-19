
// dependencies
const express = require("express");

 const app = express();
 // set port with NodeJS.Process.env: 
 let PORT = process.env.PORT || 8080;

//middleware: handle json and data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require js file designated for api route handling
require("./routes/apiRoutes")(app);

// serve static files in designated public directory
// variant >> app.use(express.static("public"));
app.use(express.static("./public", {
	extensions: ['html', 'js', 'css'],
}));

// at server start, express.listen takes a port and callback err handler
app.listen(PORT, function(err) {
	console.log("Listening on PORT: " + PORT);      
});
  