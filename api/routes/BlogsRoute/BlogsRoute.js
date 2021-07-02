const express = require('express');

const { getBlogController } = require('../../controllers/blogsController/blogController');

const router = express.Router();

router.get('/', getBlogController);

module.exports = router;
