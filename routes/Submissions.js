const express = require('express');
const submissions = express.Router();
const cors = require('cors');
const db = require('../database/db');
const Flow = require('../models/Submission');
const generateId = require('../functions/functions').generateId;

submissions.use(cors());

process.env.SECRET_KEY = 'secret';

submissions.post('/create', (req, res) => {
    const subData = {
        sub_id: req.body.sub_id,
        sub_key: req.body.sub_key,
        formId: req.body.formId,
        answer: req.body.answer,
        flowId: req.body.flowId,
        status: req.body.status,
    }
   
        db.sequelize.query(`INSERT INTO submissions (id, sub_id, sub_key, formId, flowId, answer, status, created) VALUES (
            UUID_SHORT(),
            '${subData.sub_id}',
            '${subData.sub_key}',
            '${subData.formId}',
            '${subData.flowId}',
            '${subData.answer}',
            '${subData.status}',
            NOW()
        )`)
        res.json({status: subData.id})
    
})

submissions.post('/getSubmission', (req, res) => {
    Flow.findAll({
        where: {
            flowId: req.body.flowId,    
        }
    })
    .then(sub => {
        if(sub){
            res.send(sub)
        }
        else{
            res.json({status: 'There is not such a flow'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

submissions.post('/update', (req, res) => {
    const newData = {
        flowId: req.body.flowId,
        status: req.body.status,
    }

    db.sequelize.query(
        `UPDATE submissions SET status='${newData.status}' where flowId='${newData.flowId}' `
    )
})

module.exports = submissions