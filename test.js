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