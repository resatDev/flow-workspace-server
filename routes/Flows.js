const express = require('express');
const flows = express.Router();
const cors = require('cors');
const db = require('../database/db');
const Flow = require('../models/Flow');
const generateId = require('../functions/functions').generateId;

flows.use(cors());

process.env.SECRET_KEY = 'secret';

flows.post('/create', (req, res) => {
    const date = new Date();
    const today = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}      ${date.getHours()}:${date.getMinutes()}`
    const flowData = {
        admin: req.body.admin,
        flowTitle: req.body.flowTitle,
        formId: req.body.formId,
        status: 'active',
        created: today
    }
    if(flowData.admin){
        const id = generateId()
        db.sequelize.query(`INSERT INTO flows (id, admin, flowTitle, formId, status, created) VALUES (
            ${id},
            '${flowData.admin}',
            '${flowData.flowTitle}',
            '${flowData.formId}',
            '${flowData.status}',
            '${flowData.created}'
        )`)
        res.json({status: id})
    }
    else{
        res.json({error: 'Admin is not found'})
    }
})

flows.post('/getFlow', (req, res) => {
    Flow.findAll({
        where: {
            admin: req.body.admin,
            status: req.body.status
        }
    })
    .then(flow => {
        if(flow){
            res.send(flow)
        }
        else{
            res.json({status: 'There is not such a flow'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = flows