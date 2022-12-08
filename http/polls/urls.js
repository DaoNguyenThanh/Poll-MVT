const express = require('express');
const path = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const gAuth = require('google-login-gsi');
const {OAuth2Client} = require('google-auth-library');
const storage = require('node-persist');
const views = require('./views');

path.route('/').get(views.index)
               .post(views.create);
path.route('/new').get(views.new);

path.route('/:poll_id/vote').post(views.vote);

path.route('/:user_id').get(views.userdetails);

//path.route('/:poll_id/questions/:questions_id/answers/:answers_id/vote').post(views.vote);
//path.route('/:answer_id/vote/:user_id').get(views.count);

module.exports = path;