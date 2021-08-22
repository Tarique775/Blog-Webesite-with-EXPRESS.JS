const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = () => async (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        return next();
    }
    try {
        const token = cookies[process.env.SET_COOKIE];
        const verify = await jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ userName: verify.userName }).select(
            '-password -confirmPassword -tokens'
        );
        console.log(user);
        // console.log(user);
        // const users = await User.findOne({ id: User._id });
        // console.log(users);
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};

const isAuth = (req, res, next) => {
    if (!req.token) {
        return res.redirect('/user/login');
    }
    next();
};

module.exports = { auth, isAuth };
