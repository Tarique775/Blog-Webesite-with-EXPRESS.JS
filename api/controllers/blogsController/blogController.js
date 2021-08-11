const moment = require('moment');

const Post = require('../../models/post');
const Profile = require('../../models/profile');

function genDate(days) {
    const date = moment().subtract(days, 'days');
    return date.toDate();
}

function genFilter(filter) {
    let filterObj = {};
    let order = 1;

    switch (filter) {
        case 'latest': {
            order = 1;
            break;
        }
        case 'week': {
            filterObj = {
                createdAt: {
                    $gt: genDate(7),
                },
            };
            order = -1;
            break;
        }
        case 'month': {
            filterObj = {
                createdAt: {
                    $gt: genDate(30),
                },
            };
            order = -1;
            break;
        }
        case 'all': {
            order = -1;
            break;
        }
    }
    return {
        filterObj,
        order,
    };
}

const controllers = {};

controllers.getBlogController = async (req, res, next) => {
    const filter = req.query.filter || 'latest';
    const currentPage = parseInt(req.query.page) || 1;
    const itemPerPage = 2;
    const { filterObj, order } = genFilter(filter.toLowerCase());
    try {
        const posts = await Post.find(filterObj)
            .populate('author', 'userName profilePics')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip(itemPerPage * currentPage - itemPerPage)

            .limit(itemPerPage);

        const totalPost = await Post.countDocuments();
        const totalPage = Math.ceil(totalPost / itemPerPage);

        let bookmarks = [];

        if (req.user) {
            const profile = await Profile.findOne({ user: req.user._id });

            if (profile) {
                bookmarks = profile.bookmarks;
            }
        }

        res.render('pages/Blogs/blogs', {
            filter,
            posts,
            totalPage,
            currentPage,
            itemPerPage,
            bookmarks,
            page_name: 'blogs',
        });
    } catch (e) {
        next(e);
    }
};

controllers.singlePostGetController = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId)
            .populate('author', 'userName profilePics')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'userName profilePics',
                },
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'userName profilePics',
                },
            });

        if (!post) {
            const error = new Error('404 Page Not Found');
            error.status = 404;
            throw error;
        }

        let bookmarks = [];

        if (req.user) {
            const profile = await Profile.findOne({ user: req.user._id });

            if (profile) {
                bookmarks = profile.bookmarks;
            }
        }

        res.render('pages/Blogs/singlePost', {
            post,
            bookmarks,
            page_name: 'blogs',
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
