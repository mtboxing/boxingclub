
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



var db = firebase.firestore();







function test(){
	//console.log("hi")
	var username = document.getElementById('username').value;
	var age = document.getElementById('age').value;
	var gender = document.getElementById('gender').value;
	var height = document.getElementById('height').value;
	var weight = document.getElementById('weight').value;
	console.log("hi", username, age, gender, height,weight)

		
		data = {
			Name: username,
			age: age,
			gender: gender,
			height: height,
			weight: weight
		}

		fetch('/data',{
    		method: 'POST', // include, *same-origin, omit
    		headers: {
      		'Content-Type': 'application/json'
      		// 'Content-Type': 'application/x-www-form-urlencoded',
    	},
    
   		body: JSON.stringify(data) // body data type must match "Content-Type" header
  		})
       .then((response) => {
        return response.json();
        // close automatically 
    	});

}
