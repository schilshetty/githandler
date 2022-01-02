const { StatusCodes } = require("http-status-codes")

const error_handler_middleware = (err, req, res, next) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: true, 
        message: 'Some thing went wrong, try again later!'
    })
}

module.exports = error_handler_middleware