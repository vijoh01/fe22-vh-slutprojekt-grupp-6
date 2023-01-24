// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const loginWrapper = document.querySelector('#loginWrapper');


// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL:
    "https://chatapp-76264-default-rtdb.europe-west1.firebasedatabase.app/",

  apiKey: "AIzaSyAZ0KJhUc6ltrF7QACjM8IW2JqeLWT3n3g",

  authDomain: "chatapp-76264.firebaseapp.com",

  projectId: "chatapp-76264",

  storageBucket: "chatapp-76264.appspot.com",

  messagingSenderId: "957844540887",

  appId: "1:957844540887:web:b31870f3a4d046dd3d4f92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const database = getDatabase();

console.log(database);

// skriva
function writeUserData(message) {
  let adressRef = ref(database, "user");
  set(adressRef, {
    namn: message,
  });
}

writeUserData("SUPP DOG!!!");

// läsa en specifik onValue direkt + när den ändrar value
const urlRef = ref(database, "user");
onValue(urlRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data.namn);
});

var loginForm = document.getElementById("login-form");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

loginForm.addEventListener("click", function (e) {
  e.preventDefault();
  var email = emailInput.value;
  var password = passwordInput.value;
  //register();
  if (e.target.id == "login-button") login(email, password);
  else if (e.target.id == "register-button") register();
});

const auth = getAuth();

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(function (user) {
      // Login success
      console.log(user);
      alert(user.user.email + " has signed in.");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user already signed in')
    loginWrapper.classList.add('hide');
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});


function register() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(function (user) {
      alert(user.user.email + " has been registred.");
      // Send email verification
      /*currentUser.sendEmailVerification()
                .then(function() {
                alert("Verification email sent!");
                })
                .catch(function(error) {
                // Handle errors
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                });
            })*/
    })
    .catch(function (error) {
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}


//DANYS FEATURE
let danyBtn = document.getElementById("danyBtn");
let danyh4 = document.getElementById("danyh4");

danyBtn.addEventListener("click", () => {
  danyh4.classList.toggle("hidden");
})