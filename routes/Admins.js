const express = require('express');
const admins = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const functions = require('./../functions/functions.js')
const Admin = require('../models/Admin');

admins.use(cors());

process.env.SECRET_KEY = 'secret';

admins.post('/register', (req, res) => {
    const today = new Date();
    const adminData = {
        id : functions.generateId(),
        username: req.body.username,
        password : req.body.password,
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        industry: req.body.industry,
        created: today
    }

    Admin.findOne({
        where: {
            username: req.body.username
        }
    })

    .then(admin => {
        if(!admin){
            db.sequelize.query(`INSERT INTO admins (id, username, password, name, email, status, industry, created)
                VALUES(${adminData.id}, 
                        '${adminData.username}',
                        '${adminData.password}',
                        '${adminData.name}',
                        '${adminData.email}',
                        '${adminData.status}',
                        '${adminData.industry}',
                        '${adminData.created}'
                    )
            `, function(err){
                console.log(err)
            })
            res.json({status: 'ok'})
        }
        else{
            res.json({error: 'User already exist'})
            console.log("error: User already exist")
        }
    })
    .catch(err => {
        res.json({error: err})
        console.log('error: ', err)
    })
})

admins.post('/login', (req, res) => {
    Admin.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(admin => {
        if(admin){
            res.json({status: 'ok'})
            res.send('ok')
        }
        else{
            res.status(400).json({error: 'Admin does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})

admins.post('/info', (req, res) => {
    Admin.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(admin => {
        if(admin){
            console.log(admin.dataValues)
            res.send(admin)
        }
        else{
            res.json({status: 'there is no person having this username'})
        }
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})



module.exports = admins