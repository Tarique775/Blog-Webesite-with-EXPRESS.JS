const Post = require('../../models/post');

const controllers = {};

controllers.getSearchController = async (req, res, next) => {
    const term = req.query.term || 'latest';
    const currentPage = parseInt(req.query.page) || 1;
    const itemPerPage = 2;
    try {
        const posts = await Post.find({
            $text: {
                $search: term,
            },
        })
            .skip(itemPerPage * currentPage - itemPerPage)

            .limit(itemPerPage);

        const totalPost = await Post.countDocuments({
            $text: {
                $search: term,
            },
        });
        const totalPage = Math.ceil(totalPost / itemPerPage);
        res.render('pages/Blogs/search', {
            title: `Result for = ${term}`,
            posts,
            totalPage,
            currentPage,
            itemPerPage,
            term,
            page_name: '',
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
