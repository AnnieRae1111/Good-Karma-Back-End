const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
{
    email:{
        type:String, 
        required:true,
        unique: true,
    },
    username: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String, 
        required:true,
    },
    city: {
        type:String,
        required: true,
    },
    state: {
        type:String,
        required: true,
    },
    zipcode:{
        type:Number, 
        required:true,
    },
    itemsHistory: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }]
    }

)

const User = mongoose.model('User', UserSchema)
module.exports = User