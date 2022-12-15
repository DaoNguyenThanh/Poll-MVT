const express = require('express');
const path = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const gAuth = require('google-login-gsi');
const views = require('./views');
const {OAuth2Client} = require('google-auth-library');
const storage = require('node-persist');

// passport.use(new GoogleStrategy({
//   clientID: process.env['GOOGLE_CLIENT_ID'],
//   clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//   callbackURL: '/oauth2/redirect/google',
//   scope: ['profile', 'email']},
//   (accessToken, refreshToken, profile, done) => {
//       console.log(accessToken);
//       console.log(refreshToken);
//       console.log(profile);
//       console.log(done);
//   }
// ));

path.route('/').get(views.login);

path.route('/').post(views.verify);

path.route('/logout').get(views.logout);

path.route('/:user_id').post(views.username);
// path.route('/google').get(passport.authenticate('google'));

module.exports = path;

