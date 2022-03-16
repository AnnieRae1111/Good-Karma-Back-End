const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth')


//get all users 
router.get('/', async (req, res, next)=> {
    try {
        const users = await User.find({})
        res.json(users)
    }catch(err){
        next(err)
    }
})


//get one user by id 
router.get('/:id', async (req, res, next)=> {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            res.json(user)
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})



//Sign up //Create New User 
// /api/signup 
router.post('/signup', async (req, res, next)=> {
    try{
        const { email } = req.body
        const password = await bcrypt.hash(req.body.password, 12)
        const user = await User.create({email, password})
        res.status(201).json(user)
    }catch (err){
        next(err)
    }
})

//Sign in 
// /api/signin 
router.post('/signin', async (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user) => createUserToken(req,user) )
    .then((token)=> res.json({ token }))
    .catch(next)
})


module.exports = router

