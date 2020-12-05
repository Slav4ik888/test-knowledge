const admin = require('firebase-admin');
const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-server-auth.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
