const { body } = require('express-validator');
const validator = require('validator');

const linkValidator = (value) => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Must be a URL Type');
        }
        return true;
    }
};

const profileValidator = [
    body('name').isLength({ max: 50 }).not().isEmpty().withMessage('Please provide a Name')
.trim(),

    body('title')
        .isLength({ max: 50 })
        .not()
        .isEmpty()
        .withMessage('Please provide a Title')
        .trim(),

    body('bio').isLength({ max: 50 }).not().isEmpty().withMessage('Please provide a Bio')
.trim(),

    body('website').custom(linkValidator).trim(),

    body('facebook').custom(linkValidator).trim(),

    body('twitter').custom(linkValidator).trim(),

    body('github').custom(linkValidator).trim(),
];

const errorFormetter = (err) => err.msg;

module.exports = { profileValidator, errorFormetter };
