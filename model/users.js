var db = require('../bin/database');

var users = db.model.define('users', {
    id_user: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = users;