
var config = require('./config')
var sentiment = require('sentiment');
var Twit = require('twit'); //import the twit module
var T = new Twit(config) // going to use the same twit object

//var result = sentiment("hello me name is sad");
//console.dir(result);
var methods = {
  begin: function(){
    console.log("Lets begin to monitor twitter");
    var stream= T.stream('user') //setting user stream

    //anytime someone tweets to use, we are going to call replyToUser
    stream.on('tweet', replyToUser)

    //----------------------------------------------------------------------------------------------------------------------
    //  this is where we are going to reply to whoever sends us a message
    //----------------------------------------------------------------------------------------------------------------------

    function replyToUser(eventMsg){
    //  console.log(eventMsg)
      var score =0;
      var id = eventMsg.id_str; //id of the tweet
      var text = eventMsg.text // message that was sent
      var tweetFrom = eventMsg.user.screen_name //username in twitter message
      var vaildAccount = eventMsg.in_reply_to_screen_name; //should be our id
      //console.log(eventMsg)
        if(vaildAccount == "YourMCM52"){
          var words = text.split(" ");
          for (i=1; i<words.length;i++){
            //console.log(words[i])
            var temp = sentiment(words[i]);
            score += temp.score;
          //  var score += temp.score
        }
          //console.log(score)
          sendTweet(tweetFrom, score, id )
        }
    }

    function sendTweet(tweetFrom,score, id){

      var emoji = " "
      if(score >= 3){
        emoji = "😉"
      }
      else if(emoji <= 0){
        emoji = "😒"
      }
      else{
        emoji = "🤓"
      }

      T.post('statuses/update', { status: "@"+ tweetFrom + " Why you got to be so: " + emoji, in_reply_to_status_id: id }, function(err, data, response) {
        if(err){
          console.log(data)
          console.log("unable to tweet this tweet, you probably already tweeted it, TRY SOMETHING ELSE")
        }
        else{
          console.log("The bot WORKED, WE TWEETED YOUR TWEET!")
          //console.log(data)
        }
      });

    }
  }
}
exports.data = methods;
