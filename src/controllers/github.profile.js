const GitProfiles = require("../database/models/github.model")
const { get_github_profile } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes");
const { profile_logger } = require("../logger/github.logger");

const get_profile_details = async (req, res) => {
    let owner_name = req.body.owner_name.toLowerCase();
    if (!owner_name) {
        profile_logger.error('owner name is missing');
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: true,
            message: "owner_name is missing",
        })
    }
    try {
        let get_user = await GitProfiles.findOne({
            where: {
                owner_name: owner_name,
            },
        })
        if (get_user) {
            profile_logger.info(`User ${owner_name} found in our database`);
            return res.status(StatusCodes.OK).send({
                error: false,
                data: get_user
            })
        }
        else {
            profile_logger.info(`${owner_name} not found in our database, fetching details from github...`);
            let find_user = await get_github_profile(owner_name);
            if (find_user.error) {
                profile_logger.error(`${owner_name} doesn't have github account!`);
                return res.status(StatusCodes.NOT_FOUND).send(find_user)
            }
            else {
                profile_logger.info(`Adding ${owner_name} into our database!`);
                let create_user = await GitProfiles.create(find_user);
                return res.status(StatusCodes.CREATED).send({
                    error: false,
                    data: find_user
                })
            }
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: true,
            message: error.message
        })
    }
}

module.exports = get_profile_details
