//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

var findOrCreate = require('mongoose-findorcreate')

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// var md5 = require('md5');
// console.log(md5('message'));

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

//////////VERY IMPORTANT FOR SECURITY//////////

const userSchema = new mongoose.Schema({ //USE NEW MONGOOSE FOR ENCRYPTION
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// const secret = "Thisisourlittlesecret."; //secret string
// console.log(process.env.API_KEY); //pull secret env variables from .env file
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { //plugin before model call below, plugin give the schemas more powers
//   secret: process.env.SECRET, encryptedFields: ['password'] //encryptedFields only encrypts certain fields
// });

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) { //findOne here is attached to require
      return cb(err, user);
    });
  }
));

//////////VERY IMPORTANT FOR SECURITY//////////

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/submit', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('submit');
  } else {
    res.redirect('/login');
  }
});

app.post('/submit', (req, res) => {
  const submittedSecret = req.body.secret;

  console.log(req.user.id);

  User.findById(req.user.id, (err, foundUser) => {
    if(err) {
      console.log(err);
    } else {
      if(foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(() => {
          res.redirect('secrets');
        });
      }
    }
  });
});

app.get('/auth/google', passport.authenticate('google', { //call to google for authentication
  scope: ['profile']
}));

app.get('/auth/google/secrets', passport.authenticate('google', {
  failureRedirect: 'login'
}), (req, res) => {
  res.redirect('/secrets');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/secrets', (req, res) => {

  User.find({"secret": {$ne: null}}, function(err, foundUsers) {
    if(err) {
      console.log(err);
    } else {
      if(foundUsers) {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    }
  });

  // if (req.isAuthenticated()) {
  //   res.render('secrets');
  // } else {
  //   res.redirect('/login');
  // }
});

app.post('/register', (req, res) => {

  User.register({
    username: req.body.username
  }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secrets');
      });
    }
  });

  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   // Store hash in your password DB.
  //   const newUser = new User({
  //     email: req.body.username,
  //     // password: md5(req.body.password)
  //     password: hash
  //   });
  //   newUser.save((err) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       res.render("secrets");
  //     }
  //   });
  // });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/login', (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secrets');
      });
    }
  });

  // const username = req.body.username;
  // // const password = md5(req.body.password); //md5 method
  // const password = req.body.password;
  //
  // User.findOne({
  //   email: username
  // }, (err, foundUser) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (foundUser) {
  //       // if (foundUser.password === password) {
  //       //   res.render("secrets");
  //       // }
  //       bcrypt.compare(password, foundUser.password, function(err, result) { //bcrypt option
  //         // result == true
  //         if (result === true) {
  //           res.render('secrets');
  //         } else {
  //           console.log("wrong password");
  //           res.redirect('/');
  //         }
  //       });
  //     }
  //   }
  // });
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
