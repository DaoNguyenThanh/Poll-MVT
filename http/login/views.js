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
    return res.redirect('/login', { msg: "Đăng nhập thất bại" })
  } else {
    const user = await models.User.upsert({
      where: {
        email: gUser.email,
      },
      update: {},
      create: {
        email: gUser.email
      },
    });
    console.log(user.id);
    const userId = user.id;
    const sessions = await findSessions({ user: userId, valid: true });
    
    return res.redirect('/polls/new', {sessions})
    
  }
  
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