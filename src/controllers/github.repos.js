const { get_github_repos } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes");
const { repos_logger } = require("../logger/github.logger");

const get_repo_details = async (req, res) => {
    let { owner_name } = req.body;
    if (!Boolean(owner_name)) {
        repos_logger.error('owner name is missing');
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: true,
            message: "owner_name is missing",
        })
    }
    let user_details = await get_github_repos(owner_name.toLowerCase())
    if (user_details.error) {
        repos_logger.error({
            message: `User ${owner_name} doesn't have git account!`
        })
        return res.status(StatusCodes.NOT_FOUND).send(user_details);
    }
    repos_logger.info(`User ${owner_name} have git account`);
    res.status(StatusCodes.OK).send(user_details)
}

module.exports = get_repo_details;
