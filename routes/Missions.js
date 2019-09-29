const express = require('express');
const missions = express.Router();
const cors = require('cors');
const db = require('../database/db');
const Mission = require('../models/Mission');

missions.use(cors());

process.env.SECRET_KEY = 'secret';

missions.post('/create', (req, res) => {
    const missionData = {
        flowTitle: req.body.flowTitle,
        flowId: req.body.flowId,
        formId: req.body.formId,
        admin: req.body.admin,
        employee: req.body.employee,
        qid: req.body.qid,
        orderQ: req.body.orderQ
    }
    console.log(missionData)
    db.sequelize.query(
        `INSERT INTO missions 
        (id, flowTitle, flowId, formId, admin, employee, qid, orderQ, created) 
        VALUES (
            UUID_SHORT(), 
            '${missionData.flowTitle}',
            '${missionData.flowId}',
            '${missionData.formId}',
            '${missionData.admin}',
            '${missionData.employee}',
            '${missionData.qid}',
            ${missionData.orderQ},
            NOW()
        )`
    )
    res.send({status: 'ok'})
})

missions.post('/update', (req, res) => {
    const newData = {
        status: req.body.status,
        orderQ: req.body.orderQ,
        flowTitle: req.body.flowTitle
    }

    db.sequelize.query(
        `UPDATE missions SET status='${newData.status}' where orderQ='${newData.orderQ}' AND flowTitle='${newData.flowTitle}' `
    )
})

missions.post('/getMissions', (req, res) => {
    Mission.findOne({
        where: {
            employee: req.body.employee,
        }
    })
    .then(missions => {
        res.send(missions)
    })
})

missions.post('/getMission', (req, res) => {
    Mission.findAll({
        where: {
            flowId: req.body.flowId,
        }
    })
    .then(mission => {
        console.log(mission)
        res.send(mission)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = missions

