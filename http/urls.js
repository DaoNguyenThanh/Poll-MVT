const express = require('express');
const path = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const homeRouter = require('./home/urls');
const pollRouter = require('./polls/urls');
const authRouter = require('./auth/urls');

path.use('/', homeRouter);
path.use('/polls', pollRouter);
path.use('/auth', authRouter);

path.get('/login/federated/google', passport.authenticate('google'));
// path.use('/auth/google/callback', passport.authenticate('google'));

path.use('/auth/redirect/google', passport.authenticate('google', {
    successRedirect: '/polls/new',
    failureRedirect: '/auth'
  }));

// path.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
path.use(passport.initialize());
path.use(passport.session());

module.exports = path;
