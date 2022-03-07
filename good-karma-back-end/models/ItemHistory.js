const mongoose = require('mongoose')

const ItemHistorySchema = new mongoose.Schema({
    items:Array, 
    owner:{
        type:String, 
        ref:'User',
        required: true,
    }

})


const ItemHistory= mongoose.model('ItemHistory', ItemHistorySchema)
module.exports = ItemHistory