console.log("The bot is now running")

var Twit = require('twit'); //import the twit module
var config = require('./config'); //get the api keys in our config file

var T = new Twit(config) // twitter object with our config(api keys)



//----------------------------------------------------------------------------------------------------------------------
//  post a status to user_timeline
//----------------------------------------------------------------------------------------------------------------------
T.post('statuses/update', { status: 'test!' }, function(err, data, response) {
  //console.log(data)
});

//----------------------------------------------------------------------------------------------------------------------
//  reply to a users post
//----------------------------------------------------------------------------------------------------------------------
T.post('statuses/update', { status: '@stayLOHAD this is a test for my new twitter bot', in_reply_to_status_id: 980815584744104000 }, function(err, data, response) {
  console.log(data)
});
//----------------------------------------------------------------------------------------------------------------------
//  retweet a tweet with id '343360866131001345'
//----------------------------------------------------------------------------------------------------------------------
//T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
  //console.log(data)
//})

//----------------------------------------------------------------------------------------------------------------------
//  get the last tweet of a user, along with the id of the tweet
//----------------------------------------------------------------------------------------------------------------------
T.get('statuses/user_timeline', { screen_name: 'stayLOHAD' , count: 1} , function(err, data, response) {
      //  console.log(data);
        for( i=0; i< data.length; i++){
          //  console.log(data[i].id, data[i].text);
        }
});
//----------------------------------------------------------------------------------------------------------------------
// favorite/like a tweet with id
//----------------------------------------------------------------------------------------------------------------------
//T.post('favorites/create', { id: '343360866131001345' }, function (err, data, response) {
  //console.log(data)
//})
//----------------------------------------------------------------------------------------------------------------------
