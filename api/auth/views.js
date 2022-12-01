const models = require(require('path').resolve('./') + '/models');
const serializers = require('./serializers');

exports.index = async (req, res, next) => {
  res.send(req.user);
}
