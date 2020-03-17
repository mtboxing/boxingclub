	/*var uid ='';
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'Messenger'));
     
       window.extAsyncInit = function() {
        var isSupported = MessengerExtensions.isInExtension(); 
        alert(isSupported);
  
        MessengerExtensions.getContext('204821140569252', 
        function success(result){
          alert("Success: "+result.psid);
          uid = result.psid;

        },
        function error(result){
          alert("eero has");
        }    
      );
      function closeWeb(){
        MessengerExtensions.requestCloseBrowser(function success() {
          alert('webview closed');
        }, function error(err) {
          alert(err.message);
        });
      }       
       
      };
      */


function test(){
	//console.log("hi")
	var username = document.getElementById('username').value;
	var age = document.getElementById('age').value;
	var gender = document.getElementById('gender').value;
	var height = document.getElementById('height').value;
	var weight = document.getElementById('weight').value;
	//console.log("hi", username, age, gender, height,weight)

		
		data = {
			Name: username,
			age: age,
			gender: gender,
			height: height,
			weight: weight
			//userid: uid
		}

		fetch('https://mtboxing.herokuapp.com/registerData',{
    		method: 'POST', // include, *same-origin, omit
    		headers: {
      		'Content-Type': 'application/json'
      		// 'Content-Type': 'application/x-www-form-urlencoded',
    	},
    
   		body: JSON.stringify(data) // body data type must match "Content-Type" header
  		})
       .then((response) => {
       // 	  MessengerExtensions.requestCloseBrowser(function success() {
       //    console.log("Webview closing");
       //    alert('close');
	      // }, function error(err) {
	      //     console.log(err);
	      //     alert('colse error: ');
	      // });
        // close automatically 
    	}).catch(err=>{
    		alert(err,'mayo');
    	});

}
