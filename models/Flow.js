const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'flow',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin: {
            type: Sequelize.INTEGER
        },
        flowTitle: {
            type: Sequelize.STRING
        },
        formId: {
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