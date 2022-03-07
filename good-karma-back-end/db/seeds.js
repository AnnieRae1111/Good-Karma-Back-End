const mongoose = require('./connection')

const Item = require('../models/Item')
const itemSeeds = require('./itemSeeds.json')

const User = require('../models/User')
const userSeeds = require('./userSeeds.json')

const ItemHistory = require('../models/ItemHistory')
const ItemHistorySeeds = require('./itemHistorySeeds.json')

// Item.insertMany(itemSeeds)
// .then(console.log)

// User.insertMany(userSeeds)
// .then(console.log)

ItemHistory.insertMany(ItemHistorySeeds)
.then(console.log)

Item.deleteMany({})
.then(()=> User.deleteMany({}))
.then(()=> {
    return User.create({email: 'fake@email.com', username:'Fake Person', password:'fakepassword', city:'Boulder', state:'Colorado', zipcode:80304 })
    .then((user)=> 
        itemSeeds.map((item)=> ({...item, owner:user._id}))
    )
    .then((items)=> Item.insertMany(items))
    
})
.then(console.log)
.catch(console.error)
.finally(()=> {
    process.exit 
})