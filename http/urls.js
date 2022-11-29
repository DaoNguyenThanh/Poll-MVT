const express = require('express');
const path = express.Router();

const homeRouter = require('./home/urls');
const pollRouter = require('./polls/urls');
// const signRouter = require('./signin/urls');

const authRouter = require('./auth/urls');

path.use('/', homeRouter);
path.use('/polls', pollRouter);
// path.use('/signin', signRouter);
path.use('/auth', authRouter);

path.use('/auth/federated/google', passport.authenticate('google'));

module.exports = path;
