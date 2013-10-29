var twitter = require('mtwitter');
var fs = require('fs');


var twit = new twitter({
  consumer_key: 'XClhiEf72XxQwMKPA2pKXA',
  consumer_secret: '5U1aPB6w77CnFHc1N8RjxKqB3YDCaiwIdQnyDs9OHM',
  access_token_key: '2153919734-rPfaCwVTamO9SlZMC4txcl5LexpNTg2uKca1lsY',
  access_token_secret: 'veosn7CB4t2dJc56k8kVoGWtOtULnYdkqmySAXqqPlw00'
});

 twit.get('/statuses/user_timeline', { include_entities: true },
                function (err, data) {
                    if (err) {
                        console.log(err.toString());
                    }
                    else {
                    	console.log(data[0].text);
                    	var tempString = data[0].text.split('s lost ');
                    	tempString = tempString[1].split(' lbs');
                    	weightLost = tempString[0];
                    	console.log(weightLost);
                    	fs.unlinkSync('../sass/_mfpWeight.scss');
                    	fs.writeFile('../sass/_mfpWeight.scss', "$weight-lost: " + weightLost + ";", function(err) {
					    if(err) {
					        console.log(err);
					    } else {
					        console.log("The file was saved!");
					    }
					}); 
                    }
            });