const cheerio = require('cheerio');
const moment = require('moment');

module.exports = () => (req, res, next) => {
    res.locals.token = req.token;
    res.locals.user = req.user;
    res.locals.truncate = (html) => {
        const node = cheerio.load(html);
        let text = node.text();

        text = text.replace(/(\r\n|\n|\r)/gm, '');

        if (text.length <= 100) {
            return text;
        }

        return `${text.substr(0, 100)}...`;
    };
    res.locals.moments = (time) => moment(time).fromNow();
    next();
};
