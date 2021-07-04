const { body } = require('express-validator');
const User = require('../../models/user');

const userValidator = [
    body('userName')
        .isLength({ min: 3, max: 20 })
        .withMessage('UserName must be between 3 to 20 chars')
        .custom(async (userName) => {
            const user = await User.findOne({ userName });
            if (user) {
                return Promise.reject('UserName allready used');
            }
        })
        .trim(),

    body('email')
        .matches(
            /^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/g,
        )
        .withMessage('Please provide a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject('Email allready used');
            }
        })
        .trim(),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be grater than 5 chars')
        .trim(),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword != req.body.password) {
                throw new Error("Password does't match");
            }
            return true;
        })
        .trim(),
];

const errorFormetter = (err) => err.msg;

module.exports = { userValidator, errorFormetter };
