const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const urls = require('./urls');
const { WebClient, ErrorCode } = require('@slack/web-api');
// const cors = require('cors');
const app = express();
  
// view engine setup
app.set('views', path.join(__dirname, '../templates'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../assets')));
// app.use(cors());

app.use(session({
  secret: '_poll_web_app',
  resave: false,
  saveUninitialized: true
}))
// app.use(session({
//   secret: '_poll_web_app',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { 
//     secure: true
//    }
// }))

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

urls.urlpatterns(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
