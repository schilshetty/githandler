const express = require("express");
const routes = require('./routes/github.routes')

const db = require("./database/models");
const notFound = require("./middleware/route.not.found");
const errorHandlerMiddleware = require("./middleware/error.handler");
const { logger } = require("./logger/github.logger");


db.authenticate().then(() => logger.info('connected to the database successfully'))
    .catch((err) => logger.error(err))

const app = express();

app.use(express.json());

app.use('/api/v1', routes)

app.use(notFound)
app.use(errorHandlerMiddleware)

module.exports = app;

