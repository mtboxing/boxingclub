
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

		fetch('https://mtboxing.herokuapp.com/registerData',{
    		method: 'POST', // include, *same-origin, omit
    		headers: {
      		'Content-Type': 'application/json'
      		// 'Content-Type': 'application/x-www-form-urlencoded',
    	},
    
   		body: JSON.stringify(data) // body data type must match "Content-Type" header
  		})
       .then((response) => {
       	alert('success');
        return response.json();
        // close automatically 
    	}).catch(err=>{
    		alert(err);
    	});

}
