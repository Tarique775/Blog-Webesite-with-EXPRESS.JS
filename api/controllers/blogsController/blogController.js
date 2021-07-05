const moment = require('moment');

const Post = require('../../models/post');

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
    const { filterObj, order } = genFilter(filter.toLowerCase());
    try {
        const posts = await Post.find(filterObj)
            .populate('author', 'userName')
            .sort(order === 1 ? '-createdAt' : 'createdAt');
        res.render('pages/blogs', {
            filter,
            posts,
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
