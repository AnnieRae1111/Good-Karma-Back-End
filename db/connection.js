require('dotenv').config()
const mongoose = require('mongoose')

const mongURI=process.env.DATABASE_URL
const db = mongoose.connection

mongoose.connect(mongURI)

// Connection Error/Success messages

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected at: remote database in .env'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open the Connection
db.on('open', () => {
	console.log('✅ mongo connection made! 🐉 🌟');
});


module.exports = mongoose;