const User = require('../../models/user');

const controllers = {};

controllers.getAuthorController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const author = await User.findById(userId).populate({
            path: 'profile',
            populate: {
                path: 'posts',
            },
        });
        res.render('pages/Blogs/author', {
            author,
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
