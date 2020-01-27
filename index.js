'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

const request = require('request')
var PAGE_ACCESS_TOKEN = 'EAAC6SKNTfKQBAGvL4kHxN3bSVOCOgW5uEQhrWtKFZBargc6cKeQrgZCrQCiZA5IH4Hqxa1TrkJ7BIfL15ATSIJ5mk47HcZBYBZAw3seZA9d3L7aYz5KdMYPIpZCGpjClWN0ZC41FerEyRV7p0msCrH2DbWhJD0Deyy5gufNqHd5mem17mZAmiFmVWh058ZAjlnZCdUZD'; 

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      var recipientId = webhook_event.sender.id 
      var message = webhook_event.message 
      if(message){

      	if(message.text){

      		if(message.text=="HI" || message.text=="hi" || message.text=="Hi") {

				  var messageData = {
					    recipient: {
					          id: recipientId
				      },
		 	       	 message: {
				          text: "Welcome from MT Boxing Club",
				          metadata: "DEVELOPER_DEFINED_METADATA"	
				        }
				    };

					 request({
					    uri: 'https://graph.facebook.com/v5.0/me/messages',
					    qs: { access_token: PAGE_ACCESS_TOKEN },
					    method: 'POST',
					    json: messageData

					  }, function (error, response, body) {
						    if(error) {
						      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
						    }
						    else {
						        console.log("Successfully sent message with id %s to recipient %s", 
						          messageId, recipientId);
						    } 
					  	}
					  );  	
      		}
      		else if(message.text==""){

      		}
      		else{

      		}

      	}
      	if(message.attachment){

      	}

      }


    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


app.get('/',(req,res)=>{
	res.send("Hello World")
})





