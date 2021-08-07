const Post = require('../../models/post');

const Comment = require('../../models/comment');

const controllers = {};

controllers.postCommentController = async (req, res, next) => {
    const { postId } = req.params;

    const { body } = req.body;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not authenticate user!',
        });
    }

    const comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: [],
    });

    try {
        const createComment = await comment.save();

        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: createComment._id } });

        const commentJSON = await Comment.findById(createComment._id).populate({
            path: 'user',
            select: 'profilePics userName',
        });

        // global.io.emit('new_comment', {
        //     body,
        //     profilePics: req.user.profilePics,
        //     userName: req.user.userName,
        // });

        return res.status(201).json(commentJSON);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Server side problem!',
        });
    }
};

controllers.postRepliesController = async (req, res, next) => {
    const { commentId } = req.params;

    const { body } = req.body;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not authenticate user!',
        });
    }

    const reply = {
        body,
        user: req.user._id,
        createAt: new Date(),
    };

    try {
        const comment_reply = await Comment.findOneAndUpdate(
            { _id: commentId },
            { $push: { replies: reply } },
        );

        // global.io.emit('new_reply', {
        //     body,
        //     profilePics: req.user.profilePics,
        //     userName: req.user.userName,
        //     createAt: comment_reply.replies.createAt,
        // });

        res.status(201).json({
            ...reply,
            profilePics: req.user.profilePics,
            userName: req.user.userName,
            createAt: comment_reply.replies.createAt,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Server side problem!',
        });
    }
};

module.exports = controllers;
