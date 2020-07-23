var config = {
    apiKey: "AIzaSyB5usrQKua0zDoUMWS-NoMf6wGoihAz4rE",
    authDomain: "warmat-9d32d.firebaseapp.com",
    databaseURL: "https://warmat-9d32d.firebaseio.com",
    projectId: "warmat-9d32d",
    storageBucket: "warmat-9d32d.appspot.com",
    messagingSenderId: "124927091557",
    appId: "1:124927091557:web:531ed441a700752f5df78c",
    measurementId: "G-KB1D9J96DN"
  };
  firebase.initializeApp(config);
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // ketika user sudah login ngapain?
      // document.getElementById("user_div").style.display = "block";
      // document.getElementById("login_div").style.display = "none";
      
      var user = firebase.auth().currentUser;
  
      if(user != null){
        // var email_id = user.email;
        // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
      console.log("Gagal");
  
      window.location.href = '../index.html';
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  