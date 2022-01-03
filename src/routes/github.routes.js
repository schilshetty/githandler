const express = require("express");
const router = express.Router();

let get_repo_details = require("../controllers/github.repos")
let get_profile_details = require("../controllers/github.profile")

router.get("/github_repos_handler", get_repo_details);

router.get("/github_profile_handler",get_profile_details)


module.exports = router;
