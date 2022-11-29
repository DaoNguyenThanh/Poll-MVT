const models = require(require('path').resolve('./') + '/models');
 
exports.auth = async (req, res, next) => {

    res.render('auth/index');
  
  }
