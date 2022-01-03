const { StatusCodes } = require("http-status-codes")

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send({
        error: true, 
        message: "Route doesn't exists!"
    })
}

module.exports = notFound;