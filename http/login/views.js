const models = require(require('path').resolve('./') + '/models');
const fetch = require('node-fetch');
const session = require('express-session');
const { WebClient, ErrorCode } = require('@slack/web-api');
require('dotenv').config();

exports.login = async (req, res, next) => {
  res.render('login/index');
}

exports.verify = async (req, res, next) => {
  const token = req.body.token;
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
  const gUser = await response.json();
  if ("error" in gUser) {
    return res.render('login/index' ,{ msg: "Đăng nhập thất bại" })
  } else {
    // Email: gUser.email
    let currentUser = {
      email: gUser.email
    };

    // Call API to get userinfo
    const web = new WebClient(process.env.SLACK_TOKEN);
    try {
      // Call the users.list method using the WebClient
      const listOfUsers = await web.users.list();
      console.log(listOfUsers.members);
      const dataUser = listOfUsers.members.find(item => item.profile.email === gUser.email);
      console.log(dataUser);
      
      currentUser.avatar = dataUser?.profile.image_192;
      console.log(currentUser.avatar);
      currentUser.name = dataUser?.real_name;
      console.log(currentUser.name);
      currentUser.slack_id = dataUser?.id;
      console.log(currentUser.slack_id);
    }
    catch (error) {
      console.error(error);
    }

    const user = await models.User.upsert({
      where: {
        email: gUser.email
      },
      update: {
        avatar: currentUser.avatar,
        name: currentUser.name
      },
      create: currentUser,
    });
    console.log(user);
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = user.id;
      req.session.avatar = user.avatar;
      req.session.username = user.name;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/polls')
      })
    })
  }  
};

exports.logout = async (req, res, next) => {
  // Logout logic
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    })
  })
};
