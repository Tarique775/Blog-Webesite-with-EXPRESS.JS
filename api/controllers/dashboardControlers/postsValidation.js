const { body } = require('express-validator');
const cheerio = require('cheerio');

const postValidator = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title can not be empty!')
        .isLength({ max: 100 })
        .withMessage('Title can not be greater than 100 chars!')
        .trim(),

    body('body')
        .not()
        .isEmpty()
        .withMessage('Body can not be empty!')
        .custom((value) => {
            const node = cheerio.load(value);
            const text = node.text();

            if (text.length > 5000) {
                throw new Error('Body can not be greater than 5000 chars!');
            }
            return true;
        }),
];

const errorFormetter = (err) => err.msg;

module.exports = { postValidator, errorFormetter };
