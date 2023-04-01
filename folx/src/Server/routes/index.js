const express = require('express').Router;
const Router = require('./api');

express.use('/api',Router);

module.exports = express;
