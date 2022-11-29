const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/').get(views.signin);

module.exports = path;