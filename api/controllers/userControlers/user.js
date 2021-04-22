const { validationResult } = require('express-validator');
const User = require('../../models/user');
const { errorFormetter } = require('./userValidation');
const { errorFormet } = require('./loginValidator');

const controllers = {};

controllers.getRegister = (req, res, next) => {
    res.render('pages/user/register', { error: {}, value: {}, success: '' });
};

controllers.postRegister = async (req, res, next) => {
    const { userName, email, password, confirmPassword 
} = req.body;

    const errors = validationResult(req).formatWith(errorFormetter);
    if (!errors.isEmpty()) {
        return res.render('pages/user/register', {
            error: errors.mapped(),
            value: {
                userName,
                email,
                password,
                confirmPassword,
            },
            success: '',
        });
    }

    try {
        const user = new User({
            userName,
            email,
            password,
            confirmPassword,
        });
        const newUser = await user.save();
        if (newUser) {
            res.render('pages/user/register', {
                error: {},
                value: {},
                success: 'Registration has been done successfully',
            });
        }
        console.log('successfull', newUser);
    } catch (err) {
        next(err);
    }
};

controllers.getLogin = (req, res, next) => {
    res.render('pages/user/login', {
        error: {},
        value: {},
        Email: '',
        Password: '',
    });
};

controllers.postLogin = async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormet);
    if (!errors.isEmpty()) {
        return res.render('pages/user/login', {
            error: errors.mapped(),
            Email: '',
            Password: '',
        });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.render('pages/user/login', {
                error: {},
                value: {},
                Email: 'Invalid Credential',
                Password: '',
            });
        }
        const isMatch = await user.matchPassword(password);
        console.log(isMatch);
        if (!isMatch) {
            return res.render('pages/user/login', {
                error: {},
                value: {},
                Email: '',
                Password: 'Invalid Credentials',
            });
        }
        const token = await user.getAuthToken();
        console.log(token);
        const cookie = res.cookie('jwt', token, {
            expires: new Date(Date.now() + 3 * 60 * 1000),
            httpOnly: true,
    });
        console.log(cookie);
        res.redirect('/api/dashbord');
        // res.redirect('/');
        // res.render('/api/user/login');
    } catch (e) {
        next(e);
    }
};

controllers.postLogout = async (req, res, next) => {
    try {
        req.user.tokens = [];
        res.clearCookie('jwt');
        await req.user.save();
        res.redirect('/api/user/login');
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
