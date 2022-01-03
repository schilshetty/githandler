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
                ownerName: repos.owner.login,
                repoName: repos.name,
                repoUrl: repos.owner.repos_url,
                description: repos.description,
                starCount: repos.stargazers_count,
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
            ownerName: userDetails.data.login,
            imageUrl: userDetails.data.avatar_url,
            createdOn: userDetails.data.created_at,
            followersCount: userDetails.data.followers,
            noOfRepos: userDetails.data.public_repos,
            followingCount: userDetails.data.following
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