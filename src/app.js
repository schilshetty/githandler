const express = require("express");
const routes = require('./routes/github.routes')

const sequelize = require("./database/models");
const not_found = require("./middleware/route.not.found");
const error_handler_middleware = require("./middleware/error.handler");


sequelize.authenticate().then(() => console.log('connected to the database successfully'))
    .catch((err) => console.log(err))

const app = express();

app.use(express.json());

app.use('/api/v1', routes)

app.use(not_found)
app.use(error_handler_middleware)

module.exports = app;

