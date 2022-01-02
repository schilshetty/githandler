const Sequelize = require("sequelize");
let config = require('../../config/github.config')


const sequelize = new Sequelize(config.get('db').name, config.get('db').username, config.get('db').password, {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize;
