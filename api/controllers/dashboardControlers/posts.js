const controllers = {};

controllers.getCreatePosts = (req, res, next) => {
    res.render('pages/dashbord/posts/create-posts');
};
module.exports = controllers;
