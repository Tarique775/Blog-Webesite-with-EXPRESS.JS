const express = require('express');
const { getAuthorController } = require('../controllers/authorController/authorController');

const route = express.Router();

route.get('/:userId', getAuthorController);

module.exports = route;
