const express = require('express');

const { isAuth } = require('../../middleware/authentication');

const {
    postCommentController,
    postRepliesController,
} = require('../../controllers/api_Controller/commentsAndReplies');

const router = express.Router();

router.post('/comments/:postId', isAuth, postCommentController);

router.post('/comments/replies/:commentId', isAuth, postRepliesController);

module.exports = router;
