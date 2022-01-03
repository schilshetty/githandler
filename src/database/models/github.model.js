const Sequelize = require("sequelize");
const db = require('./index') 

class GitProfiles extends Sequelize.Model { };


GitProfiles.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    owner_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    following_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    followers_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    no_of_repos: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
},
    {
        sequelize: db,
        modelName: "GitProfiles",
        freezeTableName: true,
    }
);

module.exports = GitProfiles;