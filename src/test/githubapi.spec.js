let chai = require('chai');
let assert = chai.assert;
let app = require('../app');
let should = chai.should();


const GitProfiles = require("../database/models/github.model")

let chaiHttp = require('chai-http');
chai.use(chaiHttp)


describe('Github API testing', () => {

    describe("GET /api/v1/githubReposHandler/:owner_name", () => {
        it("Get all repos of user", (done) => {
            chai.request(app)
                .get("/api/v1/githubReposHandler/mojombo")
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('owner_name')
                    response.body[0].should.have.property('repo_name')
                    response.body[0].should.have.property('repo_url')
                    response.body[0].should.have.property('description')
                    response.body[0].should.have.property('star_count')
                    done()
                })
        })
        it("It should not get all repos of user", (done) => {
            chai.request(app)
                .get("/api/v1/githubReposHandler")
                .end((err, response) => {
                    response.should.have.status(404)
                    done()
                })
        })
    })


    describe("GET /api/v1/githubProfileHandler/:owner_name", () => {

        it("Get the profile of the user", (done) => {
            let ownerName = 'mtodd'
            GitProfiles.findOne({
                where: {
                    owner_name: ownerName,
                },
            }).then((user) => {
                if (user) {
                    chai.request(app)
                        .get("/api/v1/githubProfileHandler/ryanb")
                        .end((err, response) => {
                            response.should.have.status(200)
                            response.body.should.be.a('object')
                            response.body.data.should.have.property("owner_name")
                            response.body.data.should.have.property("owner_name").eq("ryanb")
                            response.body.data.should.have.property("image_url")
                            response.body.data.should.have.property("following_count")
                            response.body.data.should.have.property("followers_count")
                            response.body.data.should.have.property("no_of_repos")
                            response.body.data.should.have.property("created_at")
                            done()
                        })
                }
                else {
                    chai.request(app)
                        .get("/api/v1/githubProfileHandler/mtodd")
                        .end((err, response) => {
                            response.should.have.status(201)
                            response.body.should.be.a('object')
                            response.body.data.should.have.property("owner_name")
                            response.body.data.should.have.property("owner_name").eq("mtodd")
                            response.body.data.should.have.property("image_url")
                            response.body.data.should.have.property("following_count")
                            response.body.data.should.have.property("followers_count")
                            response.body.data.should.have.property("no_of_repos")
                            response.body.data.should.have.property("created_at")
                            done()
                        })
                }

            })

        })
        it("It should not get the profile of the user", (done) => {
            chai.request(app)
                .get("/api/v1/githubProfileHandler")
                .end((err, response) => {
                    response.should.have.status(404)
                    done()
                })
        })
    })
})
