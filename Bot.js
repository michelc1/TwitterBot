console.log("The bot is now running")

var Twit = require('twit'); //import the twit module

var T = new Twit({
  consumer_key:         'NTqP9WukLwvXoR4JxHQHuY44a',
  consumer_secret:      'xFKAbIdKCYCv4LIVg9wzbNHnhwHJYHOtLomGQSOJr5yq9E3drY',
  access_token:         '981010968095395840-HvWwDRT4k0UwKQryX0RJP6LFLbgRqVb',
  access_token_secret:  'gPhHk8ltX235WepQbJ7oSLG2zBfgg4ma2LPMbdxonjSJ8',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
});