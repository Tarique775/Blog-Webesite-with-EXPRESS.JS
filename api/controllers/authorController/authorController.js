const User = require('../../models/user');

exports.getAuthorController = async (req, res, next) => {
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
            page_name: '',
        });
    } catch (e) {
        next(e);
    }
};
