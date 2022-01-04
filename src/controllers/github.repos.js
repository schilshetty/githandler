const { getGithubRepos } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../logger/github.logger");

const getRepoDetails = async (req, res) => {
    let ownerName  = req.params.owner_name.toLowerCase();
    if (!Boolean(ownerName)) {
        logger.error('owner name is missing');
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: true,
            message: "owner name is missing",
        })
    }
    let userDetails = await getGithubRepos(ownerName.toLowerCase())
    if (userDetails.error) {
        logger.error({
            message: `User ${ownerName} doesn't have git account!`
        })
        return res.status(StatusCodes.NOT_FOUND).send(userDetails);
    }
    logger.info(`User ${ownerName} have git account`);
    res.status(StatusCodes.OK).send(userDetails)
}

module.exports = getRepoDetails;
