const GitProfiles = require("../database/models/github.model")
const { get_github_profile } = require("../services/github.services")
const { StatusCodes } = require("http-status-codes")

const get_profile_details = async (req, res) => {
    let owner_name = req.body.owner_name.toLowerCase();
    if (!owner_name) {
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
            return res.status(StatusCodes.OK).send({
                error: false,
                data: get_user
            })
        }
        else {
            let find_user = await get_github_profile(owner_name)
            if (find_user.error) {
                return res.status(StatusCodes.NOT_FOUND).send(find_user)
            }
            else {
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
