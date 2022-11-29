const express = require('express');
const path = express.Router();

const homeRouter = require('./home/urls');
const pollRouter = require('./polls/urls');
const signRouter = require('./signin/urls');

path.use('/', homeRouter);
path.use('/polls', pollRouter);
path.use('/signin', signRouter);

module.exports = path;
