const { get_github_repos } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes")


const get_repo_details = async (req, res) => {
    let { owner_name } = req.body;
    if (!Boolean(owner_name)) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: true,
            message: "owner_name is missing",
        })
    }
    let user_details = await get_github_repos(owner_name.toLowerCase())
    if (user_details.error) {
        return res.status(StatusCodes.NOT_FOUND).send(user_details)
    }
    res.status(StatusCodes.OK).send(user_details)
}

module.exports = get_repo_details;
