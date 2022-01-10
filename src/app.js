const express = require("express");
const routes = require('./routes/github.routes')

const notFound = require("./middleware/route.not.found");
const errorHandlerMiddleware = require("./middleware/error.handler");

const app = express();

app.use(express.json());

app.use('/api/v1', routes)

app.use(notFound)
app.use(errorHandlerMiddleware)

module.exports = app;

