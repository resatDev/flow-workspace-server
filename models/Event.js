const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'event',
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: Sequelize.STRING
        },
        def: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)