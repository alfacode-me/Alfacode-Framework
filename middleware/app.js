var router = require('express').Router();
var configApp = require('../config/app');

module.exports = {
    path: '/',
    router: router
};

router.get('/', (req, res, next) => {
    res.locals.app = configApp;
    next();
});