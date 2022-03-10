const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    category:String,
    title: String, 
    date_posted: Date,
    owner:{
        type:String, 
        ref:'User',
        required: true,
    },
    claimed_by:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        
    },
    images: []
})

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item