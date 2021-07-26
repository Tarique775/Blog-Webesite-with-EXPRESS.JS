require('dotenv').config();
const express = require('express');

const morgan = require('morgan');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

// const config = require('config');

const mongoDBConnect = async () => {
    try {
        const mongooseConnect = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        if (mongooseConnect) {
            return console.log('database conected successfully!');
        }
    } catch (err) {
        throw new Error(err);
    }
};
mongoDBConnect();

// const multer = require('multer');
const userRoute = require('./api/routes/userRoute/user');
const dashbordRoute = require('./api/routes/dashbordRoute/dashbord');
const apiRoute = require('./api/routes/api_Route/apiRoute');
// const blogsRoute = require('./api/routes/BlogsRoute/BlogsRoute');
const uploadProfilePicsRoute = require('./api/routes/uploadProfilepicRoute/uploadProfilepics');
const { auth } = require('./api/middleware/authentication');
const locals = require('./api/middleware/locals');
const blogRoute = require('./api/routes/BlogsRoute/BlogsRoute');

const app = express();
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
app.use('/api/user', userRoute);
app.use('/api/dashbord', dashbordRoute, uploadProfilePicsRoute);

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
        console.log(err.message);
    } else {
        res.render('pages/500Server');
        // return res.status(500).json({ message: 'there was a requesting error!' });
        console.log('there was a requesting error!');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`listen on port ${process.env.PORT}`);
});
