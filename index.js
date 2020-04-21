'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),
  path = require('path'); 
  // creates express http server
  app.set('views', path.join(__dirname+'/views'));
  app.set('view engine','ejs');
  

 var acccountService = 
 ({
  "type": "service_account",
  "project_id": "boxingclub-9fef1",
  "private_key_id": "9c21e1b500183411a9b3fc141ace962faeaa101d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvNkXSswtpN9Nk\n6H+/qMB5zp3DupkwWXMUX+fRJF3qxqHZdAkfTyk6n1VRcWQIINhZcS8U9Ts8f7Mb\nVTorBBwGwmaW8/UzcRNP8sUPJioraS8HFp/q0LUw+Nt6OJDrBskEI5lKWIpnRKOf\nHoHTuFMZ2IpLdZiV3q5s8ULldLxfd93036w/uFdA50sFGs0tyqM7YUPK8sznWeuR\nsOHS3FOu92pbb84SDAaO8pkW6sk7Zw9JYG7uhnH3leo4d+RxbOlAJ9ERb1F3LeS2\nq9E9mw9ma46C4xsKYhxqRlF1eM8/UXHKb3vGIixnjhJq/GTf4iSIqxVswmIl0gdm\nWEM5jH/NAgMBAAECggEABVQz/vLJnc9gG1FT81cVVY8Sbs3J03XhAWViVlLSFW4p\npYS5M03Tze/jJyk49uNS2TOPUEaeINqsbqAitwS2uoDmoGA2nLQrd3LFig6p2Syn\njMJkJj7nR+BFwpueUruf2QOhKaj0OqxUgqYpojAYvPBAUoe21pYRfYg/9d0dTpT4\nfRzNJWtiX8TaR0NCSXxn+BlJ72eayDidT/f6B+zGaMsxwwqwx4FU4jaMWfONgAQN\nPitdMmS3j194cjJ2dLf8SmFCFqooTzIjyDOIxIFFSOknE5Z/mPZVJ87PySzl+XmA\nn37wCwJqMd7eO0VIV9bMokbU4MJiXVcRK0PvR0y/8QKBgQDvawKpV5xGxREFVIQ9\n8tPBRv54lpC5E3jSQFylUaxgcImNExoQETf5Pxj4WLny25JssdcBnCr9Ns5a0VaZ\ndrVVEiYRDTGlnjtBpTCBFAAQnqmph20r/OfJZO/GkoTSwiietWC2+20fGSmDxeTc\nvRQbaHIlelyyBgDJZohOdjQz0QKBgQC7WNxeOgOf0/IB/ZRF/ebNVyZ1MY1ujmDB\n6HVGoaREmP5YSp7odRxPYpwyQhJ4GGo6FTozZbKScRUoP88boNpyg+wtYzfMfQcw\nbgJt25PEB+LGapP+2uJO5Jd8V9YCiqXfw+l8ZO3biKEZuHOSZR9WZqP3ewyB08sj\n8uQ1+iZ3PQKBgFk/PLi/jePbpiKkhL9K+6C6xDVTexNirNFDaMW/klBI4x2Rl0+R\n+5mP6dD50iczrnuSN6HEA0ps2bOFAZEnbSUPJN2KW41vVIt99nzHZdbMLlahwxJ4\nrjamx7Lv/09JTTcMSccsJltHV/BlHpEicpJc9t/9ovxBvJ1W+Uy2R3NhAoGAWXkH\nzYyBXJx5MNAtNvwadSjQ+hlPRWSD+zeMgs4ByK0Uk5AXskbz3Unn9OyvK2HloZWv\ntQo1rVCKXS2UOMqqaRRuAAMpi+SOQWfYiyTZvj5R5JbT1VwtxqXPXxgH4jDbJTHI\nWZtOKZFn9wOrVlgrDjV4y2GdyIcgtitzKAAuzLUCgYEAukBFYXk7u5Cjithcs279\neykV33l3Zv05OCS3IQcgeMu3WluaHZcS3QITHCyVqMOydGRNmh0Q0+0aXZG2/B3T\nZgBSOmurP+Typ45+eAWU2eroVBf3qOrfO9sWPVJ3SMAlTaWUC6VgyNG4vyHra14+\nudTZuNuFS/eCkATo+i9eI0s=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-l6qix@boxingclub-9fef1.iam.gserviceaccount.com",
  "client_id": "115048244356876224880",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l6qix%40boxingclub-9fef1.iam.gserviceaccount.com"
});
  // Initialize Firebase
  
const admin = require('firebase-admin');
//const functions = require('firebase-functions');

admin.initializeApp({
  credential: admin.credential.cert(acccountService)  
});

let db = admin.firestore();

/*--------------------------------
----------------------------------*/
//start of functionality

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
    "uri": "https://graph.facebook.com/v6.0/me/messages",
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
      "uri": "https://graph.facebook.com/"+sender_psid+"?fields=first_name,last_name,profile_pic&access_token="+PAGE_ACCESS_TOKEN",
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
                      "messenger_extensions": "true",  
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

// function setupavailable(recipient_Id,match_date){
//   db.collection('match').doc().set({
//         challengerID: recipient_Id,
        
//         date: match_date
//     })
//     .then(function(docRef) {
//         console.log("Document written with ID", docRef);

       
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
    
//     });
// }


//auto convert to weekday to date 
function getDateOfWeekday(refday){
    var days = {
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thur: 4,
        Fri: 5,
        Sat: 6,
        Sun: 0
    };
    if(!days.hasOwnProperty(refday))throw new Error(refday+" is not listed in "+JSON.stringify(days));
    var currDate = new Date();
    var currTimestamp = currDate.getTime();
    var triggerDay = days[refday];
    var dayMillDiff=0;
    var dayInMill = 1000*60*60*24;
    // add a day to dayMillDiff as long as the desired refday (sunday for instance) is not reached
    while(currDate.getDay()!=triggerDay){
        dayMillDiff += dayInMill;
        currDate = new Date(currDate.getTime()+dayInMill);
    }
    return new Date(currTimestamp + dayMillDiff);
}


//end of function
/*--------------------------------
----------------------------------*/

/*let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
*/

const request = require('request')
var PAGE_ACCESS_TOKEN = 'EAAC6SKNTfKQBAGvL4kHxN3bSVOCOgW5uEQhrWtKFZBargc6cKeQrgZCrQCiZA5IH4Hqxa1TrkJ7BIfL15ATSIJ5mk47HcZBYBZAw3seZA9d3L7aYz5KdMYPIpZCGpjClWN0ZC41FerEyRV7p0msCrH2DbWhJD0Deyy5gufNqHd5mem17mZAmiFmVWh058ZAjlnZCdUZD'; 

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.use(express.static('public'));

// herokulink/register
app.get('/register', (req,res)=>{
  res.sendFile(__dirname + '/public/register.html')
})

/*app.get('/challengelater/:id',(req,res)=>{
 console.log(__dirname);
  res.render('calendar' , {receiptid: req.params.id }); 
  //res.sendFile(__dirname + '/public/calendar.html')
}) */


//match database
app.post('/data', (req,res)=>{
  console.log(req.body.userId, req.body.date);
  setupavailable(req.body.userId,req.body.date);

});

app.post('/registerData', (req,res)=>{
 // console.log();
  db.collection('users').doc().set({
        Name: req.body.Name,
        Age: req.body.age,
        Gender: req.body.gender,
        Height: req.body.height,
        Weight: req.body.weight
    })
    .then(function(docRef) {
        console.log("Document written with ID");

       
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    
    });
})
// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;
  console.log('Myroot file is ', __dirname);

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      var recipientId = webhook_event.sender.id 
      var message = webhook_event.message || webhook_event.postback || webhook_event.quick_reply

      	if(message.text || message.title || message.payload)
        {
        //get started
      		if(message.title=="Get Started" || message.text=="Get Started" || message.text=="Hello" || message.text=="hi" || message.text=="Hi" || message.payload == "Cancel") 
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
          
      		else if(message.payload== "Challenge" || message.text=="Challenge")
          {
            callSendAPI(recipientId,{
              "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"button",
                  "text": `You can challenge the person,\nPlease, make sure you choose the right decision.`,
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
                    "payload": "challenge_later"
                    /*"url":`https://mtboxing.herokuapp.com/challengelater/${recipientId}`,
                    "webview_height_ratio":"full"*/
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

          //start of challenge now
          else if(message.payload == "challenge_now" || message.text=="Challenge Now")
          {
            let request_body = {
              "recipient": {
                "id": recipientId
              },
              
              "messaging_type": "RESPONSE",
              "message": 
              {
                "text": `This is available boxer you can challenge now.`
              }


            }

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                  callSendAPI(recipientId, {
                    "attachment":{
                      "type":"template",
                        "payload":{
                          "template_type":"generic",
                          "elements":
                          [
                            {
                            "title":`Username`,
                            "image_url":"https://i.pinimg.com/originals/3a/59/f1/3a59f13bbe775518072832cb0f308aa0.png",  
                            "subtitle":`If you want to challenge that person, you can send challenge now.`,
                            "buttons":
                            [
                              {
                              "type":"postback",
                              "title":"Request Challenge",
                              "payload":"request_challenge"
                              },
                              {
                              "type":"postback",
                              "title":"Cancel",
                              "payload":"Cancel"
                              }
                            ]
                            }
                          ]
                        }
                      }
                    });
                } else {
                  console.error("Unable to send message:" + err);
                }
              });
            
          /*  db.collection('match').where('date','==' ,'03/19/2020' ).get().then(item=>{
              if(item.empty){
                ///show sth

              }else{
                item.docs.forEach(doc=>{
                    // fetchind facebook profile 
              
                });// for each end

              }
            })//db collection end

            // Send the HTTP request to the Messenger Platform
          */
          
          }//end of challenge now

          //start of wait for accept the challenge
          else if(message.payload == "request_challenge")
          {
            callSendAPI(recipientId,{
              "text": "You have challenged to the Username. Please wait for the confirmation. We will notify you if the Username is confirm."
            }); 
          }//end of wait for accept


          //start of challenge later
          else if(message.payload == "challenge_later" || message.text == "Challenge Later" )
          {
           callSendAPI(recipientId, {
              "attachment":{
                "type":"template",
                  "payload":{
                    "template_type":"button",
                    "text": `Do you want to challenge this week or next week.\n`,
                    "buttons":
                    [
                      {
                        "type":"postback",
                        "title":"This Week",
                        "payload":"this_week"
                      },
                      {
                        "type":"postback",
                        "title":"Next Week",
                        "payload":"next_week"
                      },
                      {
                        "type":"postback",
                        "title":"Cancel",
                        "payload":"Challenge"
                      }
                    ]
                  }
                }
              });
          }
          //end of challenge later

          //start of this week
          else if(message.payload == "this_week" || message.text == "This Week")
          {
             let request_body;
            
            var d = new Date();
            var n = d.getDay();
           // console.log(n);
            switch (n) {
             case 0:
               request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                             {
                             "content_type":"text",
                             "title":"Next Mon",
                             "payload":"Next Mon"
                           },
                           {
                             "content_type":"text",
                             "title":"Next Tue",
                             "payload":"Next Tue"
                           },{
                             "content_type":"text",
                             "title":"Next Wed",
                             "payload":"Next Wed"
                           },{
                             "content_type":"text",
                             "title":"Next Thur",
                             "payload":"Next Thur"
                           },{
                             "content_type":"text",
                             "title":"Next Fri",
                             "payload":"Next Fri"
                           },{
                             "content_type":"text",
                             "title":"Next Sat",
                             "payload":"Next Sat"
                           },{
                             "content_type":"text",
                             "title":"Next Sun",
                             "payload":"Next Sun"
                           }
                        ]
                      }
                    
                    }
              

               break;
              case 1:
                 request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                            
                           {
                             "content_type":"text",
                             "title":"Tue",
                             "payload":"Tue"
                           },{
                             "content_type":"text",
                             "title":"Wed",
                             "payload":"Wed"
                           },{
                             "content_type":"text",
                             "title":"Thur",
                             "payload":"Thur"
                           },{
                             "content_type":"text",
                             "title":"Fri",
                             "payload":"Fri"
                           },{
                             "content_type":"text",
                             "title":"Sat",
                             "payload":"Sat"
                           },{
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }
                
                break;

               case 2:
                  request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                           {
                             "content_type":"text",
                             "title":"Wed",
                             "payload":"Wed"
                           },{
                             "content_type":"text",
                             "title":"Thur",
                             "payload":"Thur"
                           },{
                             "content_type":"text",
                             "title":"Fri",
                             "payload":"Fri"
                           },{
                             "content_type":"text",
                             "title":"Sat",
                             "payload":"Sat"
                           },{
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }

               break;
               case 3:
                 request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                            {
                             "content_type":"text",
                             "title":"Thur",
                             "payload":"Thur"
                           },{
                             "content_type":"text",
                             "title":"Fri",
                             "payload":"Fri"
                           },{
                             "content_type":"text",
                             "title":"Sat",
                             "payload":"Sat"
                           },{
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }

               break;
               case 4:
                   request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                            {
                             "content_type":"text",
                             "title":"Fri",
                             "payload":"Fri"
                           },{
                             "content_type":"text",
                             "title":"Sat",
                             "payload":"Sat"
                           },{
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }
                 break;
               case 5:
                  request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                             {
                             "content_type":"text",
                             "title":"Sat",
                             "payload":"Sat"
                           },{
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }
                 break;
               case 6:
                 request_body = {
                      "recipient": {
                        "id": recipientId
                      },

                      "messaging_type": "RESPONSE",
                      "message": 
                      {
                        "text": "Choose a date:",
                        "quick_replies":
                        [
                            {
                             "content_type":"text",
                             "title":"Sun",
                             "payload":"Sun"
                           }
                        ]
                      }
                    
                    }
                 break;
                 
            
              default:
                break;
            }

  


            //////////////////

           



            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                } else {
                  console.error("Unable to send message:" + err);
                }
              });

            //end of request

          }//end of this week

          //start of next week
        else if(message.payload == "next_week" || message.text == "Next Week")
          {
           // console.log("success pass next week");

            let request_body = {
              "recipient": {
                "id": recipientId
              },

              "messaging_type": "RESPONSE",
              "message": 
              {
                "text": "Choose a date:",
                "quick_replies":
                [
                  {
                    "content_type":"text",
                    "title":"Today",
                    "payload":"Today",
                    "image_url":""
                  },
                  {
                    "content_type":"text",
                    "title":"Tomorrow",
                    "payload":"Tomorrow",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"The day after Tomorrow",
                    "payload":"",
                    "image_url":""   
                  }
                ]
              }
            
            }



            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                } else {
                  console.error("Unable to send message:" + err);
                }
              });


          }
          //end of challenge later



          
          

          

          //start of choose date payload
          else if(message.quick_reply.payload == "Sun" || message.quick_reply.payload == "Mon" || message.quick_reply.payload == "Tue" || message.quick_reply.payload == "Wed" || message.quick_reply.payload == "Thurs" || message.quick_reply.payload == "Fri" || message.quick_reply.payload == "Sat")
          {

            
            var dayfrompayload = message.quick_reply.payload;
            var date = getDateOfWeekday(dayfrompayload);
            //setupavailable(recipientId, message.quick_reply.payload)
            db.collection('match').doc().set({
              challengerID: recipientId,
              weekday: dayfrompayload,
              Dates: date
            })
            .then(function(docRef) {
                console.log("Document written with ID", docRef);
               let request_body = {
              "recipient": {
                "id": recipientId
              },
              
              "messaging_type": "RESPONSE",
              "message": 
              {
                "text": "Do you want to add another days",
                "quick_replies":
                [
                  {
                    "content_type":"text",
                    "title":"Yes",
                    "payload":"yes"
                  },
                  {
                    "content_type":"text",
                    "title":"No",
                    "payload":"no"
                  }
                ]
              }


            }
            // end of more 

             request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                } else {
                  console.error("Unable to send message:" + err);
                }
              });
            
               
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);


              let  request_errbody = {
              "recipient": {
                "id": recipientId
              },
              
              "messaging_type": "RESPONSE",
              "message": 
              {
                "text": `Error occurs.`
              }


            }
            /// end of erro
             request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_errbody
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                } else {
                  console.error("Unable to send message:" + err);
                }
              });

            
            });


            
             // end of request 

           
                
          }// end of choose date payload

          //start of add day yes
          else if(message.quick_reply.payload == "yes" )
          {
            
            
            callSendAPI(recipientId, {
              "attachment":{
                "type":"template",
                  "payload":{
                    "template_type":"button",
                    "text": `Do you want to challenge this week or next week.\n`,
                    "buttons":
                    [
                      {
                        "type":"postback",
                        "title":"This Week",
                        "payload":"this_week"
                      },
                      {
                        "type":"postback",
                        "title":"Next Week",
                        "payload":"next_week"
                      },
                      {
                        "type":"postback",
                        "title":"Cancel",
                        "payload":"Challenge"
                      }
                    ]
                  }
                }
              });
                
          }// end of yes

          //start of add day no
          else if(message.quick_reply.payload == "no" )
          {
            
            
            //setupavailable(recipientId, message.quick_reply.payload)

            let request_body = {
              "recipient": {
                "id": recipientId
              },
              
              "messaging_type": "RESPONSE",
              "message": 
              {
                "text": `We will notify you if you got challenged on that day.`
              }


            }

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
              }, (err, res, body) => {
                if (!err) { 
                  console.log('message sent!');
                  callSendAPI(recipientId, {
                    "attachment":{
                      "type":"template",
                        "payload":{
                          "template_type":"button",
                          "text": `IF you want to challenge "Today".\nClick the button "Challenge Now"`,
                          "buttons":
                          [
                            {
                              "type":"postback",
                              "title":"Challenge Now",
                              "payload":"challenge_now"
                            }
                          ]
                        }
                      }
                    });

                } else {
                  console.error("Unable to send message:" + err);
                }
              });
                
          }// end of no



          
          

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






