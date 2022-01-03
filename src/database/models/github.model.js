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
    ownerName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    followingCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    followersCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    noOfRepos: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdOn: {
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