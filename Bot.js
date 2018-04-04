

var Twit = require('twit'); //import the twit module
var config = require('./config'); //get the api keys in our config file
var readline = require('readline-sync'); //take in user input
var T = new Twit(config) // twitter object with our config(api keys)

console.log("\n")
console.log("---------------------------")
console.log("Welcome to our twitter bot")
console.log("---------------------------")
console.log("\n")
//userInput();

//----------------------------------------------------------------------------------------------------------------------
//  use for GUI app
//----------------------------------------------------------------------------------------------------------------------

if(config.postTweet == true){
  postTweet();
}
else if(config.replyToUser == true){
  replyToUser();
}
else if(config.retweet == true){
  retweet();
}
else if(config.getID == true){
  getID(function(id){});
}
else if(config.favorite == true){
  favorite();
}
else(
  console.log("all options are false")
)

//----------------------------------------------------------------------------------------------------------------------
//  take in userInput from user via terminal
//----------------------------------------------------------------------------------------------------------------------

function userInput(){
//capture user input
var userChoice = readline.question("Please choose the option below that you would like to excute" +
"\n" +
"Please enter 'p' to post a tweet to twitter" +
"\n" +
"Please enter 'u' to reply to a user's last tweet" +
"\n" +
"Please enter 'r' to retweet a user's last tweet " +
"\n" +
"Please enter 'i' to get the id of last user's tweet " +
"\n" +
"Please enter in 'f' to favorite a user's last tweet" +
"\n"
);
//console.log("you choice + userChoice");

if (userChoice == 'p' || userChoice == 'P'){
  postTweet();
}
else if (userChoice == "u" || userChoice == "U"){
  replyToUser();
}
else if(userChoice == "r" || userChoice == "R"){
  retweet();
}
else if(userChoice == "i" || userChoice == "I"){
  getID(function(id){});
}
else if(userChoice == "f" || userChoice == "F"){
  favorite();
}
else{
  console.log("You did not enter in a correct choice please try again!\n")
  userInput();
}
}


//----------------------------------------------------------------------------------------------------------------------
//  functions that control our bot, call any of these actions to make something happen on twitter
//   getId returns the id of a tweet needed for , favoriting, replying and retweeting
//----------------------------------------------------------------------------------------------------------------------

//postTweet();
//replyToUser();
//retweet();
//getID();
//favorite();


//----------------------------------------------------------------------------------------------------------------------
//  post a status to user_timeline
//----------------------------------------------------------------------------------------------------------------------

function postTweet(){

    T.post('statuses/update', { status: config.tweet }, function(err, data, response) {
      if(err){
        console.log(data);
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
  getID(function(id){

    T.post('statuses/update', { status: "@"+ config.twitter_account + config.reply_to_user, in_reply_to_status_id: id }, function(err, data, response) {
      if(err){
        console.log(data)
        console.log("unable to tweet this tweet, you probably already tweeted it, TRY SOMETHING ELSE")
      }
      else{
        console.log("The bot WORKED, WE TWEETED YOUR TWEET!")
        //console.log(data)
      }
    });
  });

  }
//----------------------------------------------------------------------------------------------------------------------
//  retweet a tweet with id '343360866131001345'
//----------------------------------------------------------------------------------------------------------------------

function retweet(){
  getID(function (id){

    T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
      if(err){
        console.log("unable to retweet this tweet, you probably already retweeted it, TRY SOMETHING ELSE")
      //  console.log(data);
    }
    else{
      console.log("The bot WORKED, WE RETWEETED YOUR TWEET!")
    }
  });
});

}

//----------------------------------------------------------------------------------------------------------------------
//  get the last tweet of a user, along with the id of the tweet
//----------------------------------------------------------------------------------------------------------------------

function getID(callback){

  var id;

    T.get('statuses/user_timeline', { screen_name: config.twitter_account , count: 1} , function(err, data, response) {
      if(err){
        console.log("unable to get the id of last tweet")
    }
    else{
      for( i=0; i< data.length; i++){
        //console.log(data)
        console.log("this id of tweet: ", data[i].text, "is: ", data[i].id_str, );
        id = data[i].id_str;
        callback(id);
      }
    }
  });
}

//----------------------------------------------------------------------------------------------------------------------
// favorite/like a tweet with id
//----------------------------------------------------------------------------------------------------------------------

function favorite(){
  getID(function (id){

    T.post('favorites/create', { id: id }, function (err, data, response) {
      if(err){
        console.log("unable to favorite this tweet, you probably already favored it, TRY SOMETHING ELSE")
        console.log(data);
    }
    else{
      console.log("The bot WORKED, WE FAVORED YOUR TWEET!")
    }
  });
});

}
