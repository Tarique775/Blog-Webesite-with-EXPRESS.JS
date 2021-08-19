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

const { auth } = require('./api/middleware/authentication');
const locals = require('./api/middleware/locals');
const setRoutes = require('./api/routes/commonRoute/commonRoute');
const { notFoundHandler, errorHandler } = require('./api/middleware/errorHandler');

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

// router middleware
setRoutes(app);

// errorHandler
app.use(notFoundHandler);

app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(chalk.green.inverse(`listen on port ${process.env.PORT}`));
});
