const express = require("express");
const router = express.Router();

let getRepoDetails = require("../controllers/github.repos")
let getProfileDetails = require("../controllers/github.profile")

router.get("/githubReposHandler", getRepoDetails);

router.get("/githubProfileHandler",getProfileDetails)


module.exports = router;
