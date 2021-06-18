const { validationResult } = require('express-validator');
const readingtime = require('reading-time');
const { errorFormetter } = require('./postsValidation');
const Profile = require('../../models/profile');
const Post = require('../../models/post');

const controllers = {};

controllers.getCreatePosts = (req, res, next) => {
    res.render('pages/dashbord/posts/create-posts', {
        errors: {},
        value: {},
    });
};

controllers.postCreatePosts = async (req, res, next) => {
    const { title, body } = req.body;
    let { tags } = req.body;

    const errors = validationResult(req).formatWith(errorFormetter);

    if (!errors.isEmpty()) {
        return res.render('pages/dashbord/posts/create-posts', {
            errors: errors.mapped(),
            value: {
                title,
                body,
            },
        });
    }

    if (tags) {
        tags = tags.split(',');
    }

    const readTime = readingtime(body).text;
    try {
        const post = new Post({
            title,
            body,
            author: req.user._id,
            tags,
            thumbnail: '',
            readTime,
            likes: [],
            dislikes: [],
            comments: [],
        });

        if (req.file) {
            post.thumbnail = `/uploads/postImage/${req.file.filename}`;
        }

        const createPost = await post.save();
        await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $push: { posts: createPost._id } },
        );

        res.render('pages/dashbord/posts/create-posts');
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
