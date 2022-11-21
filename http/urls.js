const express = require('express');
const path = express.Router();

const homeRouter = require('./home/urls')
const pollRouter = require('./polls/urls')

path.use('/', homeRouter);
path.use('/polls', pollRouter);

module.exports = path;
