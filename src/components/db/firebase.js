import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDzOcibln0YpeJjkZz7HPgIc36CAbHdXsg",
  authDomain: "todo-app-5f783.firebaseapp.com",
  databaseURL: 'https://todo-app-5f783-default-rtdb.firebaseio.com/',
  projectId: "todo-app-5f783",
  storageBucket: "todo-app-5f783.appspot.com",
  messagingSenderId: "263326049860",
  appId: "1:263326049860:web:f60d2d5d137d2021d73e11",
  measurementId: "G-Z8LLN32H03"
});

const DB = firebaseApp.firestore();

export default DB;
