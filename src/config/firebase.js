import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqxna-4ZE08WkFCA_5IUqvxTDfkEzgaDI",
  authDomain: "sociogram-worlds.firebaseapp.com",
  databaseURL: "https://sociogram-worlds.firebaseio.com",
  projectId: "sociogram-worlds",
  storageBucket: "sociogram-worlds.appspot.com",
  messagingSenderId: "598795257478",
  appId: "1:598795257178:web:7fn497aff26cfa9be51f63",
  measurementId: "G-MVLFK4L9MK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
