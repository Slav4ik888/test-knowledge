const firebase = require('firebase');
const firebaseConfig = require('./config');

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
module.exports = { auth };
