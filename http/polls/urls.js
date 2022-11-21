const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/').get(views.index)
               .post(views.create);
path.route('/new').get(views.new);

module.exports = path;