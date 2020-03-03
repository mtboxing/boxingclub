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
                          "title":"Do you have your account!",
                          "image_url":"https://i.pinimg.com/originals/51/9b/cf/519bcfc9e1404745e9e0f63a4c15c623.jpg",  
                          "subtitle":"Before challenge to anyone,  Click here to register",
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


