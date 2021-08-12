const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const changePasswordValidator = [
    body('oldPassword')
        .custom(async (oldPassword, { req }) => {
            const match = await bcrypt.compare(oldPassword, req.user.password);
            if (!match) {
                return Promise.reject("Password doesn't match");
            }
        })
        .trim(),

    body('newPassword')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm)
        .withMessage(
            'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        )
        .trim(),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.newPassword) {
                throw new Error("Password does't match");
            }
            return true;
        })
        .trim(),
];

const errorFormetter = (err) => err.msg;

module.exports = { changePasswordValidator, errorFormetter };
