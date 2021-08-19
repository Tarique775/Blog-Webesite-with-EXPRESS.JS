const express = require('express');
const dashbordController = require('../controllers/dashboardControlers/dashbord');
const { isAuth } = require('../middleware/authentication');
const { profileValidator } = require('../controllers/dashboardControlers/profileValidation');

const { postValidator } = require('../controllers/dashboardControlers/postsValidation');

const {
    getCreatePosts,
    postCreatePosts,
    getEditPosts,
    postEditPosts,
    getDeletePosts,
    getMyPosts,
} = require('../controllers/dashboardControlers/posts');

const postUpload = require('../middleware/postMulterUpload');

const router = express.Router();

router.get('/', isAuth, dashbordController.getDashbord);

router.get('/comments', isAuth, dashbordController.getComments);

router.get('/bookmarks', isAuth, dashbordController.getBookmarks);

router.get('/create-profile', isAuth, dashbordController.getCreateProfile);

router.post('/create-profile', isAuth, profileValidator, dashbordController.postCreateProfile);

router.get('/edit-profile', isAuth, dashbordController.getEditProfile);

router.post('/edit-profile', isAuth, profileValidator, dashbordController.postEditProfile);

router.get('/create-posts', isAuth, getCreatePosts);

router.post('/create-posts', isAuth, postUpload.single('photo'), postValidator, postCreatePosts);

router.get('/edit-posts/:postId', isAuth, getEditPosts);

router.post(
    '/edit-posts/:postId',
    isAuth,
    postUpload.single('photo'),
    postValidator,
    postEditPosts
);

router.get('/delete-posts/:postId', isAuth, getDeletePosts);

router.get('/posts', isAuth, getMyPosts);

module.exports = router;
