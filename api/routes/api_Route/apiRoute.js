const express = require('express');

const { isAuth } = require('../../middleware/authentication');

const {
    postCommentController,
    postRepliesController,
} = require('../../controllers/api_Controller/commentsAndReplies');

const {
    getLikesController,
    getDislikesController,
} = require('../../controllers/api_Controller/likesAndDislikes');

const { getBookMarksController } = require('../../controllers/api_Controller/bookmarks');

const router = express.Router();

router.post('/comments/:postId', isAuth, postCommentController);

router.post('/comments/replies/:commentId', isAuth, postRepliesController);

router.get('/likes/:postId', isAuth, getLikesController);

router.get('/dislikes/:postId', isAuth, getDislikesController);

router.get('/bookmarks/:postId', isAuth, getBookMarksController);

module.exports = router;
