const express = require('express');

const userController = require('../controllers/userControlers/user');
const { userValidator } = require('../controllers/userControlers/userValidation');
const { loginValidator } = require('../controllers/userControlers/loginValidator');
const { isAuth } = require('../middleware/authentication');

const { changePasswordValidator } = require('../controllers/userControlers/chngpassValidation');

const router = express.Router();

router.get('/');

router.get('/signup', userController.getRegister);

router.post('/signup', userValidator, userController.postRegister);

router.get('/login', userController.getLogin);

router.post('/login', loginValidator, userController.postLogin);

router.get('/logout', userController.postLogout);

router.get('/change-password', isAuth, userController.getChangePassword);

router.post('/change-password', isAuth, changePasswordValidator, userController.postChangePassword);

module.exports = router;
