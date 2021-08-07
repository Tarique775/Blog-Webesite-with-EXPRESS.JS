const express = require('express');
const { getSearchController } = require('../controllers/searchController/serchController');

const route = express.Router();

route.get('/', getSearchController);

module.exports = route;
