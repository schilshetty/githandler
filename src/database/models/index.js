const Sequelize = require("sequelize");
let config = require('../../config/github.config')


const db = new Sequelize(config.get('db').name, config.get('db').username, config.get('db').password, {
    host: "localhost",
    dialect: "postgres",
});



db.sync({ force: true });

module.exports = db;
