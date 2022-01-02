const express = require("express");

const sequelize = require("./database/models");


sequelize.authenticate().then(() => console.log('connected to the database successfully'))
    .catch((err) => console.log(err))

const app = express();

app.use(express.json());

app.use('/', routes)

app.use(not_found)
app.use(error_handler_middleware)

module.exports = app;

