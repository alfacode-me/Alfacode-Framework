var Sequelize = require('sequelize');
var path = require('path');

var configApp = require('../config/app');

var sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: path.join(__dirname, `../database/${configApp.database}.db`)
});

module.exports = {
    model: sequelize,
    Sequelize: Sequelize
};