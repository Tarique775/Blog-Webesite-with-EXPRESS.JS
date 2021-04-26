const { body } = require('express-validator');

const loginValidator = [
    body('email').not().isEmpty().withMessage('Please provide a valid email')
.trim(),
    body('password').not().isEmpty().withMessage('Please provide a valid password')
.trim(),
];

const errorFormet = (err) => err.msg;

module.exports = { loginValidator, errorFormet };
