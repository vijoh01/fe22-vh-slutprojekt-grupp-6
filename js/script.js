// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase,ref,set,onValue,remove,push
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  databaseURL: "https://grupp-7-faf57-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyCy9NnGD5XhgbTL_N8cMZQV68Ws2lXGfjs",

  authDomain: "grupp-7-faf57.firebaseapp.com",

  projectId: "grupp-7-faf57",

  storageBucket: "grupp-7-faf57.appspot.com",

  messagingSenderId: "766654586149",

  appId: "1:766654586149:web:31c7fbf916edbbab270ecc"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

console.log(database);

// skriva
function writeUserData(message) {
  let adressRef= ref(database, "user" );
  set(adressRef, {
      namn: message,
  });
}

writeUserData( "SUPP DOG!!!");

// läsa en specifik onValue direkt + när den ändrar value
const urlRef = ref(database, "user");
onValue(urlRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data.namn);
  document.body.innerHTML = data.namn;
});
