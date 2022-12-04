const models = require(require('path').resolve('./') + '/models');

exports.login = async (req, res, next) => {
  res.render('login/index');
}

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