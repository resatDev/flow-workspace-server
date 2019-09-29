const express = require('express');
const users = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const functions = require('./../functions/functions')
const User = require('../models/User');

users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res)=> {
    const today = new Date();
    const userData =  {
        id: functions.generateId(),
        password: '123456',
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        department: req.body.department,
        admin: req.body.admin,
        created: today    
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user){
            db.sequelize.query("INSERT INTO users (id,password,name,surname,email,department,admin,created) VALUES('" + userData.id + "','" + userData.password + "','" + userData.name +"','" + userData.surname + "','" + userData.email + "','" + userData.department + "','" + userData.admin + "','" + userData.created + "')", function(err){
                res.send(err)
                alert('There has been an error')
            })
            res.json({status: 'ok'})
            //mailer(userData.name, userData.surname, userData.password, userData.email)
        }else{
            console.log('error: User already exists')
            res.json({error: 'User already exists'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (user) {
                res.send(user)
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
      })
      .catch(err => {
            res.status(400).json({ error: err })
      })
  })
  
users.post('/infos', (req, res) => {
    User.findAll({
        where: {
            id: req.body.empID
        }
    })
    .then(user => {
        if(user){
            res.send(user)
        }
        else{
            res.send({error: 'This admin do not have any user'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

users.post('/info', (req, res) => {
    User.findAll({
        where: {
            admin: req.body.admin
        }
    })
    .then(user => {
        if(user){
            res.send(user)
        }
        else{
            res.send({error: 'This admin do not have any user'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = users

