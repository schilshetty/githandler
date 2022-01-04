const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: true, 
        message: 'Some thing went wrong, try again later!'
    })
}

module.exports = errorHandlerMiddleware