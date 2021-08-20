const { body } = require('express-validator');
const User = require('../../models/user');

exports.userValidator = [
    body('userName')
        .isLength({ min: 3, max: 15 })
        .withMessage('UserName must be between 3 to 15 chars')
        .custom(async (userName) => {
            const user = await User.findOne({ userName });
            if (user) {
                return Promise.reject('UserName allready used');
            }
        })
        .trim(),

    body('email')
        .matches(
            /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/,
            'g'
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
        .isLength({ min: 1 })
        .matches(
            /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
            'g'
        )
        .withMessage(
            'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
        )
        .trim(),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error("Password does't match");
            }
            return true;
        })
        .trim(),
];

exports.errorFormetter = (err) => err.msg;
