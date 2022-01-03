const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const config = require('../config/github.config')

const { base_url, github_token } = config.get('github')

const set_headers = {
    Authorization: `Bearer ${github_token}`,
}
const error_object = {
    "error": true,
    "status_code": StatusCodes.NOT_FOUND,
    "message": "Not Found",
    "documentation_url": "https://docs.github.com/rest/reference/repos#list-repositories-for-a-user"
}

async function get_github_repos(owner_name) {
    try {
        let user_details = await axios.get(`${base_url}/${owner_name}/repos`, {
            headers: set_headers
        })
        let sortedData = user_details.data.map((repos) => {
            return {
                owner_name: repos.owner.login,
                repo_name: repos.name,
                repo_url: repos.owner.repos_url,
                description: repos.description,
                star_count: repos.stargazers_count,
            }
        })
        return sortedData;
    }
    catch (error) {
        return error_object;
    }
}



module.exports = {
    get_github_repos
}