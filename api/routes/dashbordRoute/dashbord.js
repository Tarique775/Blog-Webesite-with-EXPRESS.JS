const express = require('express');
const dashbordController = require('../../controllers/dashboardControlers/dashbord');
const { isAuth } = require('../../middleware/authentication');
const { profileValidator } = require('../../controllers/dashboardControlers/profileValidation');

const router = express.Router();

router.get('/', isAuth, dashbordController.getDashbord);

router.get('/create-profile', isAuth, dashbordController.getCreateProfile);

router.post('/create-profile', isAuth, profileValidator, dashbordController.postCreateProfile);

router.get('/edit-profile', isAuth, dashbordController.getEditProfile);

router.post('/edit-profile', isAuth, profileValidator, dashbordController.postEditProfile);

module.exports = router;
