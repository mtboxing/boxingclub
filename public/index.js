
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB4cIxZnmyYMGwN_4vflGwCoVKd3n9BiOk",
    authDomain: "mtboxing-283ae.firebaseapp.com",
    databaseURL: "https://mtboxing-283ae.firebaseio.com",
    projectId: "mtboxing-283ae",
    storageBucket: "mtboxing-283ae.appspot.com",
    messagingSenderId: "460646938978",
    appId: "1:460646938978:web:75ee82b4d5d10a535d143b",
    measurementId: "G-6F7ZQ2736L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



var db = firebase.firestore();

function test(){

	var username = document.getElementById('username').value
	var age = document.getElementById('age').value
	//var gender = document.getElementById('gender').value
	//var height = document.getElementById('height').value
	//var weight = document.getElementById('weight').value

		db.collection("users").add({
		    Name: `${username}`,
		    Age: `${age}`
		    //Gender: `${gender}`,
		    //Height: `${height}`,
		    //Weight: `${weight}`
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});

}