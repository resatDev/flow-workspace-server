const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'admin',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        industry: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.NOW
        },
    },
    {
        timestamps: false
    }
)