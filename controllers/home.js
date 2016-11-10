var router = require('express').Router();
var configApp = require('../config/app');

module.exports = {
    path: '/',
    router: router
};

router.use('/', (req, res, next) => {
    res.locals.app = configApp;
    res.render('home');
});