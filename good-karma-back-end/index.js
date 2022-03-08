const express = require('express')
const app = express()
const cors = require('cors')
// const bcrypt = require('bcrypt') //user auth 
require('./db/connection')
const PORT = process.env.PORT
app.set('port', process.env.PORT || 8000)



//========== 
//MIDDLEWARE
//==========
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//===========
//ROUTES
//===========
// //Redirect currently commented out believe main page on front end will be create trip 
app.get('/', (req, res) => {
    res.redirect('/api/items')
})

//Log each request as it comes in 
const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

//===========
//CONTROLLERS
//===========
const itemController = require('./controllers/itemController');
app.use('/api/items', itemController);

const userController = require('./controllers/userController');
app.use('/api/users', userController);

// const userController = require('./controllers/usersController');
// app.use('/api', userController);



//END CONTROLLERS
app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).send(message)
})

// //The catch all for handling erros
// const { handleErrors } = require('./middleware/custom_errors');
// app.use(handleErrors);


//START THE SERVER
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🐲 🌟`);
});




