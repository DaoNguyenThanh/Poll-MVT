const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/').get(views.index)
               .post(views.create);
path.route('/new').get(views.new);
path.route('/:answer_id/vote').get(views.vote);
path.route('/:answer_id/vote/:user_id').get(views.count);

module.exports = path;