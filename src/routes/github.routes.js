const express = require("express");
const router = express.Router();

let get_repo_details = require("../controllers/github.repos")

router.get("/github_repos_handler", get_repo_details);

router.get("/github_profile_handler",(req, res) => {
    //Building repos handler
})


module.exports = router;
