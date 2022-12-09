const models = require(require('path').resolve('./') + '/models');

exports.isAuthenticated = async (req, res, next) => {
    const userId = req.session.user;
    if (userId) {
        const user = await models.user.findUnique({
            where: {
                id: userId
            }
        });

        if (user) return next();
    }

    res.redirect('/login');
}