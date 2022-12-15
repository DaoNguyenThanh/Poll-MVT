const models = require(require('path').resolve('./') + '/models');
const fetch = require('node-fetch');
const session = require('express-session');
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
    const user = await models.User.upsert({
      where: {
        email: gUser.email
      },
      update: {},
      create: {
        email: gUser.email
      },
    });
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = user.id;
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
  // logout logic
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
// exports.verify = async (req, res, next) => {
//  (profile, done) => {

//     // Check if google profile exist.
//     if (profile.id) {

//       User.findOne({googleId: profile.id})
//         .then((existingUser) => {
//           if (existingUser) {
//             done(null, existingUser);
//           } else {
//             new User({
//               googleId: profile.id,
//               email: profile.emails[0].value
//             })
//               .save()
//               .then(user => done(null, user));
//           }
//         })
//     }
//   }
// };

exports.username = async (req, res, next) => {

  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;

  // Initialize
  const web = new WebClient(token);
  // You probably want to use a database to store any user information.
  let usersStore = {};

  try {
    // Call the users.list method using the WebClient
    const user_name = await web.client.users.list();
    console.log(user_name);
    saveUsers(user_name.members);
  }
  catch (error) {
    // Check the code property, and when its a PlatformError, log the whole response.
    if (error.code === ErrorCode.PlatformError) {
      console.log(error.data);
    } else {
      // Some other error, oh no!
      console.log('Well, that was unexpected.');
    }
  }
  // Put users into the JavaScript object
  function saveUsers(usersArray) {
    let userId = '';
    usersArray.forEach(function(user){
      // Key user info on their unique user ID
      userId = user["id"];
      
      // Store the entire user object (you may not need all of the info)
      usersStore[userId] = user;
    });
  }
  res.redirect('/polls');
}  