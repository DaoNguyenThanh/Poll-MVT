const express = require('express');
const path = express.Router();

const views = require('./views');

path.route('/').get(views.index)
               .post(views.create);
path.route('/new').get(views.new);

path.route('/:poll_id/vote').post(views.vote);

//path.route('/:poll_id/questions/:questions_id/answers/:answers_id/vote').post(views.vote);
//path.route('/:answer_id/vote/:user_id').get(views.count);

module.exports = path;