var express = require("express");
var bodyParser = require("body-parser");
var sentiment = require('./sentiment');

// Application configuration
var app = express();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});

//call our monitor bot
sentiment.data.begin();

// Handles all routes
require("./routes.js")(app);
