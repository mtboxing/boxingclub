'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server
const admin = require('firebase-admin');

let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const request = require('request')
var PAGE_ACCESS_TOKEN = 'EAAC6SKNTfKQBAGvL4kHxN3bSVOCOgW5uEQhrWtKFZBargc6cKeQrgZCrQCiZA5IH4Hqxa1TrkJ7BIfL15ATSIJ5mk47HcZBYBZAw3seZA9d3L7aYz5KdMYPIpZCGpjClWN0ZC41FerEyRV7p0msCrH2DbWhJD0Deyy5gufNqHd5mem17mZAmiFmVWh058ZAjlnZCdUZD'; 

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.use(express.static('public'));

// herokulink/register
app.get('/register', (req,res)=>{
  res.sendFile(__dirname + '/public/register.html')
})

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
      var message = webhook_event.message || webhook_event.postback

      	if(message.text || message.title || message.payload)
        {
        //get started
      		if(message.title=="Get Started" || message.text=="Get Started" || message.text=="Hello" || message.text=="hi" || message.text=="Hi") 
          {

              const _EXTERNAL_URL = 'https://graph.facebook.com/'+recipientId+'?fields=first_name,last_name&access_token='+ PAGE_ACCESS_TOKEN ;
              const callExternalApiUsingRequest = (callback) => {
                  request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
                  if (err) { 
                      console.log(err);
                      return callback(err);
                      
                   }
                   //console.log("ok");
                  return callback(body);
                  
                  });
                }

                 callExternalApiUsingRequest((res)=>{
                  
                    let name = res.first_name +' '+res.last_name;
                    callSendAPI(recipientId, {
                            "attachment":{
                            "type":"template",
                            "payload":{
                            "template_type":"button",
                            "text": ` Hi ${name}. I am a bot to help you,\nWelcome to MT Boxing Club where you can challenge the match.\nAt any time, use the menu below to navigate through the features.`,
                            "buttons":
                            [
                              {
                              "type":"postback",
                              "title":"Challenge",
                              "payload":"Challenge"
                              },
                              {
                              "type":"postback",
                              "title":"Learn to Box",
                              "payload":"Learn_to_Box"
                              }
                            ]
                          }
                            }
                  });
                  
                   
                })//end of callExternalApiUsingRequest


           
      		}//end of get started
          
      		else if(message.payload== "Challenge" || userInput =="Challenge")
          {
            callSendAPI(recipientId,{
              "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"button",
                  "text": `You can challenge the game,\nPlease, make sure you choose the right decision.`,
                  "buttons":
                  [
                    {
                      "type":"postback",
                      "title":"Challenge Now",
                      "payload":"challenge_now"
                    },
                    {
                    "type":"postback",
                    "title":"Challenge Later",
                    "payload":"challenge_later"
                    },
                    {
                    "type":"postback",
                    "title":"Got Challenge?",
                    "payload":"got_challenge"
                    }
                  ]
                }
              }
            });
          }//end of challenge button


          else if(message.payload == "challenge_now" || userInput == "challenge_now" )
          {
            callSendAPI(recipientId,{
              "attachment":{
                "type":"template",
                "payload":{
                "template_type":"generic",
                "elements":
                  [
                    {
                      "title":"Username",
                      "image_url":"https://i.pinimg.com/originals/51/9b/cf/519bcfc9e1404745e9e0f63a4c15c623.jpg",  
                      "subtitle":"If you want to challenge that person, you can send challenge now.",
                      "buttons":
                      [
                        {
                          "type":"postback",
                          "title":"Send Challenge",
                          "payload":"send_challenge"
                        },
                        {
                          "type":"postback",
                          "title":"Cancel",
                          "payload":"cancel"
                        }              
                      ]      
                    }
                  ]
                }
              }
            });
          }//end of view available boxer

      	}
//end of main function
      


    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v5.0/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {

      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 

}

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) 
  {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) 
    {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else 
    {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});//end of get webhook


app.get('/',(req,res)=>{
	res.send("Hello World")
})

app.get('/setgsbutton',function(req,res){
    setupGetStartedButton(res);    
});

app.get('/setpersistentmenu',function(req,res){
    setupPersistentMenu(res);    
});

function setupGetStartedButton(res){
        var messageData = {
                "get_started":{"payload":"USER_DEFINED_PAYLOAD"} ,
                "greeting":[
  {
    "locale":"default",
    "text":"Hello {{user_full_name}}! Thanks for choosing our platform."
  } 
]              
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 

//start user profile

/*function getUserProfile(sender_psid) {
  return new Promise(resolve => {
    request({
      "uri": "https://graph.facebook.com/"+sender_psid+"?fields=first_name,last_name,profile_pic&access_token=EAAGmSf4ySjMBACxNfZAdxEzIPZCT6lyZAyXZCKHmM2DnRO87hH3s5rRaofImCtfTLp3198fMrntu0K5kZBa0WGbcYx4RC4CUNRRku1U3GFvsBO5ZCllHGA6FaWMeL5ZALdph3omIDBanwAW27JTM5zFYslhbqVerzPn7lglQ4vO5r26P4gvIzBb",
      "method": "GET"
      }, (err, res, body) => {
        if (!err) { 
          let data = JSON.parse(body);  
          resolve(data);                 
    } else {
      console.error("Error:" + err);
    }
    });
  });
} */
// end of function user profile

function setupPersistentMenu(res){
        var messageData = { 
            "persistent_menu":[
                {
                  "locale":"default",
                  "composer_input_disabled":false,
                  "call_to_actions":
                [
                    {
                      "type": "postback",
                      "title": "Learn to Box",
                      "payload": "Learn_to_Box"                        
                     },
                     {
                        "title":"Register for Challenge",
                        "type":"web_url",
                        "url":"https://mtboxing.herokuapp.com/register",
                        "webview_height_ratio":"full"
                      }
                ]
            }
          ]          
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    }




