const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const config = require('../config/github.config')
const { baseUrl, githubToken } = config.get('github')

const setHeaders = {
    Authorization: `Bearer ${githubToken}`,
}
const errorObject = {
    "error": true,
    "status_code": StatusCodes.NOT_FOUND,
    "message": "Not Found",
    "documentation_url": "https://docs.github.com/rest/reference/repos#list-repositories-for-a-user"
}

async function getGithubRepos(ownerName) {
    try {
        let userDetails = await axios.get(`${baseUrl}/${ownerName}/repos`, {
            headers: setHeaders
        })
        let sortedData = userDetails.data.map((repos) => {
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
        return errorObject;
    }
}

async function getGithubProfile(ownerName) {
    try {
        let userDetails = await axios.get(`${baseUrl}/${ownerName}`, {
            headers: setHeaders
        })
        let sortedData = {
            owner_name: userDetails.data.login,
            image_url: userDetails.data.avatar_url,
            created_at: userDetails.data.created_at,
            followers_count: userDetails.data.followers,
            no_of_repos: userDetails.data.public_repos,
            following_count: userDetails.data.following
        }
        return sortedData;
    }
    catch (error) {
        return errorObject;
    }
}


module.exports = {
    getGithubRepos,
    getGithubProfile
}