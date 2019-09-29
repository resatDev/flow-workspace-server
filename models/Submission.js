const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'submission',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sub_id: {
            type: Sequelize.STRING
        },
        sub_key: {
            type: Sequelize.STRING
        },
        formId: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        },
        flowId: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
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