const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/auth').get(views.index);

module.exports = path;
