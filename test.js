'use strict';
const request = require('request');
var PAGE_ACCESS_TOKEN = 'EAAC6SKNTfKQBAGvL4kHxN3bSVOCOgW5uEQhrWtKFZBargc6cKeQrgZCrQCiZA5IH4Hqxa1TrkJ7BIfL15ATSIJ5mk47HcZBYBZAw3seZA9d3L7aYz5KdMYPIpZCGpjClWN0ZC41FerEyRV7p0msCrH2DbWhJD0Deyy5gufNqHd5mem17mZAmiFmVWh058ZAjlnZCdUZD'; 


	console.log('ok');

	request({
		url:'https://graph.facebook.com/v5.0/me?fields=id,name&access_token='+PAGE_ACCESS_TOKEN,
        method: 'GET'
    }, (req, res)=>{
    	//if(!err){
    		// let data ={
    		// 	"id": body.id,
    		// 	"name": body.name,
    		// };
    		console.log(res.body);
    		
    	// }else
    	// {
    	// 	console.error("Error:"+ err);
    	// }

});


//module.exports.callapi = myapicall;




// Image template for register
 else if(message.payload== "" || userInput =="")
{
 callSendAPI(recipientId, {
                "attachment":{
                    "type":"template",
                    "payload":{
                      "template_type":"generic",
                      "elements":[
                         {
                          "title":"Username",
                          "image_url":"https://i.pinimg.com/originals/3a/59/f1/3a59f13bbe775518072832cb0f308aa0.png",  
                          "subtitle":`If you want to challenge that person, you can request to challenge now.`,
                          "default_action": {
                            "type": "web_url",
                            "url": "https://mtboxing.herokuapp.com/register",
                            "webview_height_ratio": "tall",
                          },
                          "buttons":[
                            {
                              "type":"web_url",
                              "url":"https://mtboxing.herokuapp.com/register",
                              "title":"Let's register"
                            },{
                              "type":"postback",
                              "title":"Already have an account.",
                              "payload":"regyes"
                            }              
                          ]      
                        }
                      ]
                    }
                  }
              })
}

//Image template end

//watch game
else if(message.payload=="wg")
          {
                    callSendAPI(recipientId, {
                            "attachment":{
                            "type":"template",
                            "payload":{
                            "template_type":"button",
                            "text": `To watch the game,\nPlease buy the ticket.\nggggg`,
                            "buttons":[
                            {
                            "type":"postback",
                            "title":"Find Match",
                            "payload":"fimatch"
                            },
                            {
                            "type":"postback",
                            "title":"View my ticket order",
                            "payload":"viorder"
                            }

                            ]
                            }
                            }
                  });
          }
//end of watch game


/*callSendAPI(recipientId,{
 "attachment":
 {
  "type":"template",
  "payload":{
  "template_type":"button",
  "text": "This is available boxer you can challenge now."
    }
  }
}); */



/*
callSendAPI(recipientId,{
              "message":
              {
                "text": "Choose a date",
                "quick_replies":
                [
                  {
                    "content_type":"text",
                    "title":"Sun",
                    "payload":"sun",
                    "image_url":""
                  },
                  {
                    "content_type":"text",
                    "title":"Mon",
                    "payload":"mon",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"Tue",
                    "payload":"tue",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"Wed",
                    "payload":"wed",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"Thurs",
                    "payload":"thurs",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"Fri",
                    "payload":"fri",
                    "image_url":""   
                  },
                  {
                    "content_type":"text",
                    "title":"Sat",
                    "payload":"sat",
                    "image_url":""   
                  }
                ]
              }
            
          });



let body ="";
 db.collection('match').where('date','==' ,'03/19/2020' ).get().then(item=>{
              if(item.empty){
                ///show sth

              }else{
                item.docs.forEach(doc=>{
                    // fetchind facebook profile 
                    body+="{
                          "title":`${doc.data.challengerID}`,
                          "image_url":"https://i.pinimg.com/originals/3a/59/f1/3a59f13bbe775518072832cb0f308aa0.png",  
                          "subtitle":`If you want to challenge that person, you can send challenge now. ${doc.data.date}`,
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
                              "payload":"Challenge"
                            }              
                          ]      
                        }";
              });

              }
            })

             request({
              "uri": "https://graph.facebook.com/v5.0/me/messages",
              "qs": { "access_token": PAGE_ACCESS_TOKEN },
              "method": "POST",
              "json": request_body
            }, (err, res, body) => {
              if (!err) {
                callSendAPI(recipientId,{
                  "attachment":{
                    "type":"template",
                    "payload":{
                    "template_type":"generic",
                    "elements":
                      [
                         body

                      ]
                    }
                  }
                });
              } else {
                console.error("Unable to send message:" + err);
              }
            });



*/


