const express = require('express');
const path = express.Router();

const userRouter = require('./users/urls')
const pollsRouter = require('./polls/urls')

path.use('/users', userRouter);
path.use('/polls', pollsRouter);

module.exports = path;
