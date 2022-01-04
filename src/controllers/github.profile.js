const GitProfiles = require("../database/models/github.model")
const { getGithubProfile } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../logger/github.logger");


const getProfileDetails = async (req, res) => {
    let ownerName = req.params.owner_name.toLowerCase();
    if (!ownerName) {
        logger.error('owner name is missing');
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: true,
            message: "owner name is missing",
        })
    }
    try {
        let getUser = await GitProfiles.findOne({
            where: {
                owner_name: ownerName,
            },
        })
        if (getUser) {
            logger.info(`User ${ownerName} found in our database`);
            return res.status(StatusCodes.OK).send({
                error: false,
                data: getUser
            })
        }
        logger.info(`${ownerName} not found in our database, fetching details from github...`);
        let findUser = await getGithubProfile(ownerName);
        if (findUser.error) {
            logger.error(`${ownerName} doesn't have github account!`);
            return res.status(StatusCodes.NOT_FOUND).send(findUser)
        }
        logger.info(`Adding ${ownerName} into our database!`);

        let createUser = await GitProfiles.create(findUser);
        return res.status(StatusCodes.CREATED).send({
            error: false,
            data: findUser
        })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: true,
            message: error.message
        })
    }
}


module.exports = getProfileDetails;
