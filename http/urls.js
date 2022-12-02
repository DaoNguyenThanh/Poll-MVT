const express = require('express');
const path = express.Router();

const homeRouter = require('./home/urls');
const pollRouter = require('./polls/urls');
const loginRouter = require('./login/urls');

path.use('/', homeRouter);
path.use('/polls', pollRouter);
path.use('/login', loginRouter);

path.route('/oauth2/redirect/google').get(async (req, res, next) => {
  console.log("A");
});

module.exports = path;
