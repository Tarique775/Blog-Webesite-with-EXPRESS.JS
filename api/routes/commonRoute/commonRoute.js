const blogRoute = require('../blogsRoute');
const apiRoute = require('../apiRoute');
const userRoute = require('../userRoute');
const dashbordRoute = require('../dashbordRoute');
const uploadProfilePicsRoute = require('../uploadProfilepicsRoute');
const searchRoute = require('../searchRoute');
const authorRoute = require('../authorRoute');

const router = [
    {
        path: '/',
        handler: blogRoute,
    },
    {
        path: '/api',
        handler: apiRoute,
    },
    {
        path: '/user',
        handler: userRoute,
    },
    {
        path: '/dashbord',
        handler: dashbordRoute,
    },
    {
        path: '/uploads',
        handler: uploadProfilePicsRoute,
    },
    {
        path: '/search',
        handler: searchRoute,
    },
    {
        path: '/author',
        handler: authorRoute,
    },
];

module.exports = (app) => {
    router.forEach((r) => {
        app.use(r.path, r.handler);
    });
};
