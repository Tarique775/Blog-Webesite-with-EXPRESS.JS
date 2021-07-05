const Post = require('../../models/post');

const controller = {};

controller.getBlogController = async (req, res, next) => {
    const filter = req.query.filter || 'latest';
    try {
        const posts = await Post.find();
        res.render('pages/user/blogs', {
            filter,
            posts,
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controller;
