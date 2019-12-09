import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyBV9ZmFxmw2prYwq1gS49DAdQqPGNTN01I',
  authDomain: 'timecapture-75c8a.firebaseapp.com',
  databaseURL: 'https://timecapture-75c8a.firebaseio.com',
  projectId: 'timecapture-75c8a',
  storageBucket: 'timecapture-75c8a.appspot.com',
  messagingSenderId: '243709554550'
}

firebase.initializeApp(config)
