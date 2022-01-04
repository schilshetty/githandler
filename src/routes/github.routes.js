const express = require("express");
const router = express.Router();

let getRepoDetails = require("../controllers/github.repos")
let getProfileDetails = require("../controllers/github.profile")

router.get("/githubReposHandler/:owner_name", getRepoDetails);

router.get("/githubProfileHandler/:owner_name",getProfileDetails)


module.exports = router;
