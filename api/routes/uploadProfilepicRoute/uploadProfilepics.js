const express = require('express');
const { isAuth } = require('../../middleware/authentication');
const upload = require('../../middleware/multerFileUpload');
const {
    uploadProfilePics,
    removeProfilePics,
} = require('../../controllers/uploadProfilePicController/uploadProfilepicController');

const route = express.Router();

route.post('/uploads/profilePics', isAuth, upload.single('profilePics'), uploadProfilePics);

route.post('/uploads/removeProfilePics', isAuth, removeProfilePics);

module.exports = route;
