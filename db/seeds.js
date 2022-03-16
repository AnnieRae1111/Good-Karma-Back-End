const mongoose = require('./connection')

const Item = require('../models/Item')
const itemSeeds = require('./itemSeeds.json')

const User = require('../models/User')
const userSeeds = require('./userSeeds.json')



// Item.insertMany(itemSeeds)
// .then(console.log)

// User.insertMany(userSeeds)
// .then(console.log)

// ItemHistory.insertMany(ItemHistorySeeds)
// .then(console.log)

Item.deleteMany({})
.then(()=> User.deleteMany({}))
.then(()=> {
    return User.create({email: 'fake@email.com', password:'fakepassword', city:'Boulder', state:'Colorado', zipcode:80304, itemsHistory:["62267a877517f7d0aeb547ef"]})
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