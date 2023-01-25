import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    remove,
    push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const loginWrapper = document.querySelector('#loginWrapper');
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

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

let signUp = false;

writeUserData("SUPP DOG!!!");

// läsa en specifik onValue direkt + när den ändrar value
const urlRef = ref(database, "user");
onValue(urlRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data.namn);
});

var loginForm = document.getElementById("login-form");
var dropdown = document.querySelector(".dropdown");
var loginTitle = document.querySelector(".login-title");
var emailInput = document.getElementById("email");
var userInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var logout = document.getElementById("logout");
var loginBtn = document.getElementById("login-button");
var navBtn = document.getElementById("nav-button");
const post = document.querySelector('#post');
const postBox = document.querySelector('#postBox');
const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('#search');


post.addEventListener('click', function(){
    postBox.classList.remove('hide');
    searchField.classList.add('hide');
    searchBtn.classList.remove('hide');
    post.classList.add('hide');
})

searchBtn.addEventListener('click', function(){
    searchBtn.classList.add('hide');
    postBox.classList.add('hide');
    post.classList.remove('hide');
    searchField.classList.remove('hide');
})

userInput.classList.add('hide');
loginForm.addEventListener("click", function (e) {
    e.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    //register();

    if (e.target.id == "login-button"){
        if (!signUp) {
        audio.play();
            login(email, password); 
        } else {
            register(email, userInput.value,password); 
        }
    }

    else if (e.target.id == "nav-button") {
        if (signUp) {
            userInput.classList.add('hide');
            loginBtn.innerText = "Sign In";
            navBtn.innerText = "Create Account";
            loginTitle.innerText = "Login";
            console.log("test");
            signUp = false;
        } else {
        userInput.classList.remove('hide');
        loginTitle.innerText = "Register";
        loginBtn.innerText = "Register";
        navBtn.innerText = "Back to Sign In";
        signUp = true;
        }
        
    }

});
dropdown.classList.add('hide');
logout.addEventListener("click", function (e) {
    
    signOut(auth).then(() => {
        console.log("logout");
        dropdown.classList.add('hide');
        loginWrapper.classList.remove('hide');
    }).catch((error) => {
        // An error happened.
    });
})

const auth = getAuth();
let currentUser = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    
    if (user != null) {
        console.log(user);
        console.log(user.displayName + ' already signed in')
        dropdown.classList.remove('hide');
        loginWrapper.classList.add('hide');
        username.innerText = auth.currentUser.displayName;
        const uid = user.uid;
    } else {
        loginForm.style.visibility = "visible";
        loginWrapper.classList.remove('hide');
        dropdown.classList.add('hide');
        // User is signed out
        // ...
    }
});

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(function (user) {
            // Login success
            dropdown.classList.remove('hide');
            loginWrapper.classList.remove('hide');
       
            loginWrapper.classList.add('hide');
            auth.currentUser.reload();
            username.innerText = auth.currentUser.displayName;

        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

let username = document.querySelector(".username");

function register(email, user, password) {

    createUserWithEmailAndPassword(auth, email, password)
        .then(function () {
            updateProfile(auth.currentUser, {
                displayName: user,
                photoURL: "da",
              }).then(function() {
                auth.currentUser.reload();
                username.innerText = auth.currentUser.displayName;
                dropdown.classList.remove('hide');
        
              }).catch(function(error) {
                // An error occurred.
              });
         

        })
        .catch(function (error) {
            // Handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

/*
//DANYS FEATURE
let danyBtn = document.getElementById("danyBtn");
let danyh4 = document.getElementById("danyh4");

danyBtn.addEventListener("click", () => {
    danyh4.classList.toggle("hidden");
})*/