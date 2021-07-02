const controller = {};

controller.getBlogController = (req, res, next) => {
    res.render('pages/user/blogs', {
        filter: 'latest',
    });
};

module.exports = controller;
