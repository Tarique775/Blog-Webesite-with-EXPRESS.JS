const express = require('express');

const userController = require('../../controllers/userControlers/user');
const { userValidator } = require('../../controllers/userControlers/userValidation');
const { loginValidator } = require('../../controllers/userControlers/loginValidator');

const router = express.Router();

router.get('/');

router.get('/register', userController.getRegister);

router.post('/register', userValidator, userController.postRegister);

router.get('/login', userController.getLogin);

router.post('/login', loginValidator, userController.postLogin);

router.get('/logout', userController.postLogout);

module.exports = router;
