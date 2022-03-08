// Create a secret to be used to encrypt/decrypt the token
// This can be any string value you want -- even gibberish.

const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'aeiou246891'

// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token
// from each of the requests sent by clients

const { Strategy, ExtractJwt } = require('passport-jwt')

//minimum required options for passport-jwt 

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

//require user model 
const User = require('../models/User')

const strategy = new Strategy(options, function (jwt_payload, done){
    User.findById(jwt_payload.id)
    .then((user)=> done(null, user))
    .catch((err)=>done(err))
})

passport.use(strategy)
passport.initialize()

const requireToken = passport.authenticate('jwt', {session: false})

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user

const createUserToken = (req, user)=> {
    if(
        !user || 
        !req.body.password || 
        !bcrypt.compareSync(req.body.password, user.password)
    ){
        const err = new Error('The provided username or password is incorrect')
        err.statusCode=422
        throw err
    }return jwt.sign({ id: user._id}, secret, {expiresIn: 3600})
}

module.exports={
    requireToken,
    createUserToken,
}