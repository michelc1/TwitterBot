var config = require('./config'); //get the api keys in our config file
var Twit = require('twit'); //import the twit module
var T = new Twit(config); // twitter object with our config(api keys)

module.exports = function(app)
{
    // Home page
    app.get('/', function(req, res){});

    app.post('/retweet/:handle', function(req, res){

        config.twitter_account = req.params.handle;
        config.retweet = true;

        retweet(res);

    });

    app.post('/favorite/:handle', function(req, res){

        config.twitter_account = req.params.handle;
        config.favorite = true;

        favorite(res);

    });

    app.post('/new/:text', function(req, res){

        config.tweet = req.params.text;
        config.postTweet = true;

        postTweet(res);

    });

    app.post('/reply/:handle/message/:message', function(req, res){

        config.twitter_account = req.params.handle;
        config.reply_to_user = " " + req.params.message;
        config.replyToUser = true;

        replyToUser(res);

    });

    function postTweet(res)
    {
        T.post('statuses/update', { status: config.tweet }, function(err, data, response) {
            if(err)
            {
                console.log(data);
                console.log("Error tweeting new Tweet.");
                res.json({"result": false})
            }
            else
            {
                console.log("Tweeted new Tweet.");
                res.json({"result": true})
            }
        });
    }

    function replyToUser(res)
    {
        getID(function(id)
        {
            //sending a reply
            T.post('statuses/update', { status: "@"+ config.twitter_account + config.reply_to_user, in_reply_to_status_id: id }, function(err, data, response) {
                if(err)
                {
                    console.log(data);
                    console.log("Error replying to user's most recent Tweet.");
                    res.json({"result": false})
                }
                else{
                    console.log("Replied to Tweet.");
                    res.json({"result": true})
                }
            });
        });
    }

    function favorite(res)
    {
        getID(function (id) {
            T.post('favorites/create', {id: id}, function (err, data, response) {
                if (err)
                {
                    console.log(data);
                    console.log("Error favoriting user's last Tweet.");
                    res.json({"result": false})
                }
                else
                {
                    console.log("Favorited Tweet.");
                    res.json({"result": true})
                }
            });
        });
    }

    function retweet(res)
    {
        getID(function (id) {
            T.post('statuses/retweet/:id', {id: id}, function (err, data, response) {
                if (err)
                {
                    console.log(data);
                    console.log("Error retweeting user's last Tweet.");
                    res.json({"result": false})
                }
                else
                {
                    console.log("Retweeted Tweet.");
                    res.json({"result": true})
                }
            });
        });
    }

    function getID(callback)
    {
        var id;

        //find the id of the last tweet of a desired user
        T.get('statuses/user_timeline', { screen_name: config.twitter_account , count: 1} , function(err, data, response) {
            if(err)
            {
                console.log("Error getting ID of last Tweet.")
            }
            else
            {
                for(var i = 0; i < data.length; i++)
                {
                    id = data[i].id_str;
                    callback(id);
                }
            }
        });
    }

    function readInputs()
    {
        // var readline = require('readline-sync'); //take in user input

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
            console.log("You did not enter in a correct choice please try again!\n");
        }
    }

};
