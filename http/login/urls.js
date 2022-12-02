const express = require('express');
const path = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const views = require('./views');

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: ['profile', 'email']},
  (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      console.log(done);
  }
));

path.route('/').get(views.login);

path.route('/google').get(passport.authenticate('google'));

module.exports = path;