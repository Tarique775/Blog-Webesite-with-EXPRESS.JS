const express = require('express');

const {
    getBlogController,
    singlePostGetController,
} = require('../controllers/blogsController/blogController');

const router = express.Router();

router.get('/', getBlogController);

router.get('/blogs/:postId', singlePostGetController);

module.exports = router;
