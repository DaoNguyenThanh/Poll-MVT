const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/polls').get(views.index);

module.exports = path;