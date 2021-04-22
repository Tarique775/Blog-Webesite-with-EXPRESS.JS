module.exports = () => (req, res, next) => {
    res.locals.token = req.token;
    res.locals.user = req.user;
    next();
};
