(function(){

	var currentTask = "";
	
	$(document).ready(function(){
		
		addEventHandlers();
        currentTask = "retweet";
        $("#task").change();
		
	});
	
	function addEventHandlers()
	{
		$("#submit-button").on('click', function(e){

            switch(currentTask){
                case "retweet":
                    requestRetweet();
                    break;
                case "favorite":
                    requestFavorite();
                    break;
                case "new":
                    requestNew();
                    break;
                case "reply":
                    requestReply();
                    break;
                default:
                    alert("The current task does not exist");
                    break;
            }

		});
		
		$("#task").change(function(e){

            currentTask = this.value;

            $(".label").css("display", "none");
            $("input").css("display", "none");
            $("." + currentTask).css("display", "block");

		});
	}

    function requestRetweet()
    {
        var handle = $($("input.retweet")[0]).val();

        // If yes, send request to node script
        $.post("/retweet/" + handle, {}, function(results){

            if(results.result)
            {
                alert("This user's last tweet has been retweeted!");
            }
            else
            {
                alert("Unable to retweet this user's last tweet.");
            }

        });
    }

    function requestFavorite()
    {
        var handle = $($("input.favorite")[0]).val();

        // If yes, send request to node script
        $.post("/favorite/" + handle, {}, function(results){

            if(results.result)
            {
                alert("This user's last tweet has been favorited!");
            }
            else
            {
                alert("Unable to favorite this user's last tweet.");
            }

        });
    }

    function requestNew()
    {
        var text = $($("input.new")[0]).val();

        // If yes, send request to node script
        $.post("/new/" + text, {}, function(results){

            if(results.result)
            {
                alert("This tweet has been tweeted!");
            }
            else
            {
                alert("Unable to tweet this.");
            }

        });
    }

    function requestReply()
    {
        var handle = $($("input.reply-handle")[0]).val();
        var text = $($("input.reply-text")[0]).val();

        var url = "/reply/" + handle + "/message/" + text;

        // If yes, send request to node script
        $.post(url, {}, function(results){

            if(results.result)
            {
                alert("This user's last tweet has been replied to!");
            }
            else
            {
                alert("Unable to reply to this user's last tweet.");
            }

        });
    }
	
})();