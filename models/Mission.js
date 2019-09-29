const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'mission',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flowTitle: {
            type: Sequelize.INTEGER
        },
        flowId: {
            type: Sequelize.STRING
        },
        formId: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.STRING
        },
        employee: {
            type: Sequelize.STRING
        },
        qid: {
            type: Sequelize.STRING
        },
        orderQ: {
            type: Sequelize.INTEGER,
        },
        created: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)