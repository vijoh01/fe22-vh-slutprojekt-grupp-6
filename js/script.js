import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
    getAuth,
    signOut,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    remove,
    push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const loginWrapper = document.querySelector("#loginWrapper");
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
const database = getDatabase();

// skriva
function writeUserData(user, message) {
    let adressRef = ref(database, "user/arr");
    console.log(user);
    push(adressRef, {
        displayName: user.displayName,
        message: message,
        date: Date.now(),
        uid: user.uid
    });
}

let signUp = false;

var loginForm = document.getElementById("login-form");
var dropdown = document.querySelector(".dropdown");
var loginTitle = document.querySelector(".login-title");
var emailInput = document.getElementById("email");
var userInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var logout = document.getElementById("logout");
var loginBtn = document.getElementById("login-button");
var navBtn = document.getElementById("nav-button");
const post = document.querySelector("#post");
const postBox = document.querySelector("#postBox");
const searchField = document.querySelector(".search-field");
const searchBtn = document.querySelector("#search");
const displayNameP = document.querySelector("#displayName p");
const profileBtn = document.querySelector(".material-symbols-outlined");
const displayProfileBtn = document.querySelector(".username");
const profileWrapper = document.querySelector("#profileWrapper");
const displayNameChange = document.querySelector("#displayNameChange");
const newDisplayName = document.querySelector("#newDisplayName");
const xProfile = document.querySelector("#xProfile");
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

const cardContainer = document.querySelector(".card-container");
const closePost = document.querySelector("#close-post");
const submitBtn = document.querySelector("#submit-button");
const postText = document.querySelector("#post-text");
const mobilePost = document.querySelector("#mobile-post");
const mobilePostBac = document.querySelector(".background-mobile-button");

closePost.addEventListener("click", (e) => {
    postBox.classList.add("hide");
});

mobilePost.addEventListener("click", (e) => {
    postBox.classList.remove("hide");
});

submitBtn.addEventListener("click", () => {
    writeUserData(auth.currentUser, postText.value);
    postBox.classList.add("hide");
    let urlRef = ref(database, "user");
    onValue(urlRef, (snapshot) => {
        const data = snapshot.val();
        let arr = Object.values(data.arr).reverse();
        cardContainer.innerHTML = "";
        let first=true;  // alriks variabel för att kolla den första card
        arr.forEach((val) => {
            let div = document.createElement("div");
            let title = document.createElement("h1");
            let text = document.createElement("p");
            let timestamp = document.createElement('p');
            title.innerText = val.displayName;
            timestamp.innerText = `${timeSince(val.date)} ago`;
            div.append(title);
            title.append(timestamp);
            timestamp.className = "timestamp";
            text.innerText = val.message;
            div.append(text);
            div.className = "card";
            if(first){
                first=false
                div.className = "card highlight";  // bara den första card har highlight classen, den innehåller animationen
            }
            cardContainer.append(div);
        });
    });
});

displayNameP.addEventListener("click", function (e) {
    e.preventDefault();
    displayNameP.classList.add("hide");
    displayNameChange.classList.remove("hide");
    newDisplayName.setAttribute("placeholder", displayNameP.innerText);
});

profileBtn.addEventListener("click", function () {
    profileWrapper.classList.remove("hide");
});

displayProfileBtn.addEventListener("click", function () {
    profileWrapper.classList.remove("hide");
});

xProfile.addEventListener("click", function () {
    profileWrapper.classList.add("hide");
});

post.addEventListener("click", function () {
    document.body.classList.add(".overflow");

    postBox.classList.remove("hide");
});


function timeSince(date) {

    let seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

userInput.classList.add("hide");
loginForm.addEventListener("click", function (e) {
    e.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    //register();

    if (e.target.id == "login-button") {
        if (!signUp) {
            audio.play();
            login(email, password);
        } else {
            register(email, userInput.value, password);
        }
        mobilePostBac.classList.remove("hide");
    } else if (e.target.id == "nav-button") {
        if (signUp) {
            userInput.classList.add("hide");
            loginBtn.innerText = "Sign In";
            navBtn.innerText = "Create Account";
            loginTitle.innerText = "Login";
            console.log("test");
            signUp = false;
        } else {
            userInput.classList.remove("hide");
            loginTitle.innerText = "Register";
            loginBtn.innerText = "Register";
            navBtn.innerText = "Back to Sign In";
            signUp = true;
        }
    }
});
mobilePostBac.classList.add("hide");
dropdown.classList.add("hide");
logout.addEventListener("click", function (e) {
    userLogout();
});

function userLogout() {
    profileWrapper.classList.add("hide");
    signOut(auth)
        .then(() => {
            console.log("logout");
            dropdown.classList.add("hide");
            loginWrapper.classList.remove("hide");
        })
        .catch((error) => {
            // An error happened.
        });
}

const auth = getAuth();
let currentUser = auth.currentUser;

displayNameChange.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let newName = newDisplayName.value;
    profileWrapper.classList.add("hide");

    updateProfile(auth.currentUser, {
        displayName: newName,
    })
        .then(() => {
            auth.currentUser.reload();
            location.reload();
            // Profile updated!
            // ...
        })
        .catch((error) => {
            // An error occurred
            // ...
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.displayName + " already signed in");
        mobilePostBac.classList.remove("hide");
        dropdown.classList.remove("hide");
        loginWrapper.classList.add("hide");
        username.innerText = auth.currentUser.displayName;
        const uid = user.uid;
        displayNameP.innerText = auth.currentUser.displayName;
        let urlRef = ref(database, "user");
        onValue(urlRef, (snapshot) => {
            const data = snapshot.val();
            let arr = Object.values(data.arr).reverse();
            cardContainer.innerHTML = "";
            arr.forEach((val) => {
                let div = document.createElement('div');
                let title = document.createElement('h1');
                let text = document.createElement('p');
                let timestamp = document.createElement('p');
                title.innerText = val.displayName;
                timestamp.innerText = `${timeSince(val.date)} ago`;
                div.append(title);
                title.append(timestamp);
                timestamp.className = "timestamp";
                text.innerText = val.message;
                div.append(text);
                div.className = "card";
                cardContainer.append(div);
            });
        });
    } else {
        mobilePostBac.classList.add("hide");
        loginForm.style.visibility = "visible";
        loginWrapper.classList.remove("hide");
        dropdown.classList.add("hide");
        // User is signed out
        // ...
    }
});

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(function (user) {
            // Login success
            dropdown.classList.remove("hide");
            loginWrapper.classList.remove("hide");

            loginWrapper.classList.add("hide");
            auth.currentUser.reload();
            username.innerText = auth.currentUser.displayName;
            displayNameP.innerText = auth.currentUser.displayName;
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
            })
                .then(function () {
                    auth.currentUser.reload();
                    username.innerText = auth.currentUser.displayName;
                    dropdown.classList.remove("hide");
                })
                .catch(function (error) {
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

//Search functions, display in a container and show the total hits of matching word
onValue(ref(database, "user/arr"), (snapshot) => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchErrorText = document.querySelector('.search-error-text');
    const searchResultsContainer = document.querySelector('#search-results-container');
    const searchResultCount = document.querySelector('#search-result-count');
    const searchBox = document.querySelector('.search-box'); 
    const searchHideBtn = document.querySelector('.search-hide-click'); 

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchMessages();
    });

    function searchMessages() {
        const searchQuery = searchInput.value.toLowerCase();
        if (searchInput.value <= 0) {
            searchResultsContainer.innerHTML = '';
            searchResultCount.innerText = ``;
            searchErrorText.innerText = 'No inputs';
            searchBox.style.display = 'none';
        }
        else {
            const filteredMessages = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().message.toLowerCase().includes(searchQuery.toLowerCase()))
                    filteredMessages.push(childSnapshot);
            });

            searchResultsContainer.innerHTML = '';

            //Here add class or id to style the messages
            filteredMessages.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                const messageDiv = document.createElement('div');
                messageDiv.innerText = childData.displayName + ": " + childData.message;
                messageDiv.style.backgroundColor = childData.color;
                messageDiv.classList.add("searchCard");
                searchResultsContainer.appendChild(messageDiv);
            });
            searchBox.style.display = 'block';
            searchResultCount.innerText = `${filteredMessages.length} matching results`;
            searchInput.value = '';
            searchErrorText.innerText = '';
        }
    }
    searchHideBtn.addEventListener('click', () => {
        searchBox.style.display = 'none';
    })
});


/*
//DANYS FEATURE
let danyBtn = document.getElementById("danyBtn");
let danyh4 = document.getElementById("danyh4");

danyBtn.addEventListener("click", () => {
    danyh4.classList.toggle("hidden");
})*/