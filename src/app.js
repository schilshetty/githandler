const express = require("express");

const sequelize = require("./database/models");


sequelize.authenticate().then(() => console.log('connected to the database successfully'))
    .catch((err) => console.log(err))

const app = express();

module.exports = app;

