const { body } = require('express-validator');

const loginValidator = [
    body('email').not().isEmpty().withMessage('Please provide a valid email'),
    body('password').not().isEmpty().withMessage('Please provide a valid password'),
];

const errorFormet = (err) => err.msg;

module.exports = { loginValidator, errorFormet };
