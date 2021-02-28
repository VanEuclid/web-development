//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//////////VERY IMPORTANT FOR SECURITY//////////

const userSchema = new mongoose.Schema({ //USE NEW MONGOOSE FOR ENCRYPTION
  email: String,
  password: String
});

// const secret = "Thisisourlittlesecret."; //secret string
// console.log(process.env.API_KEY); //pull secret env variables from .env file
// const secret = process.env.SECRET;
userSchema.plugin(encrypt, { //plugin before model call below, plugin give the schemas more powers
  secret: process.env.SECRET, encryptedFields: ['password'] //encryptedFields only encrypts certain fields
});

const User = new mongoose.model('User', userSchema);

//////////VERY IMPORTANT FOR SECURITY//////////

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.render("secrets");
    }
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    email: username
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
