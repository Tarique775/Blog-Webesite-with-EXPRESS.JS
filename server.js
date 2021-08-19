require('dotenv').config();
const express = require('express');

const morgan = require('morgan');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const http = require('http');

const chalk = require('chalk');

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);

global.io = io;

const userRoute = require('./api/routes/userRoute');
const dashbordRoute = require('./api/routes/dashbordRoute');
const apiRoute = require('./api/routes/apiRoute');
const searchRoute = require('./api/routes/searchRoute');
const uploadProfilePicsRoute = require('./api/routes/uploadProfilepicsRoute');
const blogRoute = require('./api/routes/blogsRoute');
const author = require('./api/routes/authorRoute');
const { auth } = require('./api/middleware/authentication');
const locals = require('./api/middleware/locals');

// const setRoutes = require('./api/routes/commonRoute/commonRoute');
const mongoDBConnect = async () => {
    try {
        const mongooseConnect = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        if (mongooseConnect) {
            return console.log(chalk.green.inverse('Database Conected Successfully!'));
        }
    } catch (err) {
        throw new Error(err);
    }
};
mongoDBConnect();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth());
app.use(locals());

app.use('/blogs', blogRoute);
app.use('/api', apiRoute);
app.use('/user', userRoute);
app.use('/dashbord', dashbordRoute, uploadProfilePicsRoute);
app.use('/search', searchRoute);
app.use('/author', author);
// setRoutes(app);

app.use((req, res, next) => {
    res.render('pages/404NotFound');
    // res.status(404).json({ message: 'not found!' });
    next();
});

app.use((err, req, res, next) => {
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
});

server.listen(process.env.PORT, () => {
    console.log(chalk.green.inverse(`listen on port ${process.env.PORT}`));
});
