const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const changePasswordValidator = [
    body('oldPassword')
        .isLength({ min: 5 })
        .withMessage('Password must be grater than 5 chars')
        .custom(async (oldPassword, { req }) => {
            const match = await bcrypt.compare(oldPassword, req.user.password);
            if (!match) {
                return Promise.reject("Password doesn't match");
            }
        })
        .trim(),

    body('newPassword')
        .isLength({ min: 5 })
        .withMessage('Password must be grater than 5 chars')
        .trim(),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword != req.body.newPassword) {
                throw new Error("Password does't match");
            }
            return true;
        })
        .trim(),
];

const errorFormetter = (err) => err.msg;

module.exports = { changePasswordValidator, errorFormetter };
