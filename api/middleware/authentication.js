const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = () => async (req, res, next) => {
    if (!req.cookies.jwt) {
        return next();
    }
    try {
        const token = req.cookies.jwt;
        const verify = await jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: verify._id }).select('+_id');
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
        return res.redirect('/api/user/login');
    }
    next();
};

module.exports = { auth, isAuth };
