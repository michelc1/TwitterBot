console.log("The bot is now running")

var Twit = require('twit'); //import the twit module
var config = require('./config'); //get the api keys in our config file

var T = new Twit(config) // twitter object with our config(api keys)

T.post('statuses/update', { status: 'test!' }, function(err, data, response) {
  console.log(data)
});
