const chalk = require('chalk');

exports.notFoundHandler = (req, res, next) => {
    res.render('pages/404NotFound');
    // res.status(404).json({ message: 'not found!' });
    next();
};

exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        res.render('pages/500Server');
        return next(err);
    }
    if (err) {
        res.render('pages/500Server');
        // return res.status(500).json({ message: err.message });
        console.log(chalk.red.inverse(err.message));
    } else {
        res.render('pages/500Server');
        // return res.status(500).json({ message: 'there was a requesting error!' });
        console.log(chalk.red.inverse('there was a requesting error!'));
    }
};
