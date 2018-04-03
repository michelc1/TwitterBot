console.log("The bot is now running")

var Twit = require('twit'); //import the twit module
var config = require('./config'); //get the api keys in our config file

var T = new Twit(config) // twitter object with our config(api keys)

//----------------------------------------------------------------------------------------------------------------------
//  functions that control our bot, call any of these actions to make something happen on twitter
//   getId returns the id of a tweet needed for , favoriting, replying and retweeting
//----------------------------------------------------------------------------------------------------------------------

//postTweet();
replyToUser();
//retweet();
//getID();
//favorite();


//----------------------------------------------------------------------------------------------------------------------
//  post a status to user_timeline
//----------------------------------------------------------------------------------------------------------------------

function postTweet(){

    T.post('statuses/update', { status: 'test!' }, function(err, data, response) {
      if(err){
        console.log("unable to tweet this tweet, you probably already tweeted it, TRY SOMETHING ELSE")
      }
      else{
        console.log("The bot WORKED, WE TWEETED YOUR TWEET!")
        //console.log(data)
      }
    });

}

//----------------------------------------------------------------------------------------------------------------------
//  reply to a users post
//----------------------------------------------------------------------------------------------------------------------

function replyToUser(){

    T.post('statuses/update', { status: '@stayLOHAD this is a tfest', in_reply_to_status_id: '981260294172413952' }, function(err, data, response) {
      if(err){
        console.log("unable to tweet this tweet, you probably already tweeted it, TRY SOMETHING ELSE")
      }
      else{
        console.log("The bot WORKED, WE TWEETED YOUR TWEET!")
        //console.log(data)
      }
    });

}
//----------------------------------------------------------------------------------------------------------------------
//  retweet a tweet with id '343360866131001345'
//----------------------------------------------------------------------------------------------------------------------

function retweet(){

    T.post('statuses/retweet/:id', { id: '981260294172413952' }, function (err, data, response) {
      if(err){
        console.log("unable to retweet this tweet, you probably already retweeted it, TRY SOMETHING ELSE")
      //  console.log(data);
    }
    else{
      console.log("The bot WORKED, WE RETWEETED YOUR TWEET!")
    }
  });

}

//----------------------------------------------------------------------------------------------------------------------
//  get the last tweet of a user, along with the id of the tweet
//----------------------------------------------------------------------------------------------------------------------

function getID(){

    T.get('statuses/user_timeline', { screen_name: 'stayLOHAD' , count: 1} , function(err, data, response) {
      if(err){
        console.log("unable to get the id of last tweet")
    }
    else{
      for( i=0; i< data.length; i++){
        //console.log(data)
        console.log("this id of tweet: ", data[i].text, "is: ", data[i].id_str, );
      }
    }
  });

}

//----------------------------------------------------------------------------------------------------------------------
// favorite/like a tweet with id
//----------------------------------------------------------------------------------------------------------------------

function favorite(){

    T.post('favorites/create', { id: '981260570048499713' }, function (err, data, response) {
      if(err){
        console.log("unable to favorite this tweet, you probably already favored it, TRY SOMETHING ELSE")
        //console.log(data);
    }
    else{
      console.log("The bot WORKED, WE FAVORED YOUR TWEET!")
    }
  });

}
