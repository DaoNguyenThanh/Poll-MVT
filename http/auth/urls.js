const express = require('express');
const path = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc').OAuth2Strategy;;
const views = require('./views');

path.route('/login').get(passport.authenticate('google'));
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
});

// path.route(new GoogleStrategy({
//     clientID: process.env['914176792303-u3clb1ifv24n369jots7ko0lnmjbrh2g.apps.googleusercontent.com'],
//     clientSecret: process.env['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'],
//     callbackURL: '/auth/redirect/google',
//     scope: ['profile', 'email']
// }));
module.exports = path;