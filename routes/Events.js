const express = require('express');
const events = express.Router();
const cors = require('cors');
const db = require('../database/db');
const Event = require('../models/Event');

events.use(cors());

process.env.SECRET_KEY = 'secret';

events.post('/add', (req, res) => {
    const eventData = {
        owner: req.body.owner,
        def: req.body.def
    }
    if(eventData.owner){
        db.sequelize.query(`INSERT INTO events (id, owner, def, created, type) VALUES (
            UUID_SHORT(),
            '${eventData.owner}',
            '${eventData.def}',
            NOW(),
            'event'

        )`)
        res.json({success: 'created'})
    }
    else{
        res.json({error: 'Admin is not found'})
    }
})

events.post('/getEvents', (req,res) => {
    Event.findAll({
        where: {
            type: req.body.type,
            owner: req.body.owner
        }
    })
    .then(event => {
        res.send(event)
    })
})

module.exports = events