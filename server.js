const express = require('express');
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./fcard-3e435-firebase-adminsdk-ilp5b-940cd69429.json");

//init firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fcard-3e435-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

//connect to firebase DB
const db = admin.database();
app.set('db', db);

//set header for CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/* IMPORT all routes */
const firebase = require('./routes/firebase');

/* INCLUDES all the routes */
app.use('/fb/', firebase);

app.listen(process.env.PORT || 80, () => {
    console.log('Server running on port 3085');
});