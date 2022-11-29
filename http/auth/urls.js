const express = require('express');
const path = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const views = require('./views');

path.route('/auth').get(views.auth);

passport.use(new GoogleStrategy({
    clientID: process.env['914176792303-u3clb1ifv24n369jots7ko0lnmjbrh2g.apps.googleusercontent.com'],
    clientSecret: process.env['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'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }));

module.exports = path;