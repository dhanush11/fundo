const express = require('express')
const port = 3005
const {mongoose} = require('./config/databse')
const cors = require('cors')
const {usersController} = require('./app/controllers/userController')
const { categoryController } = require('./app/controllers/categoryController')
const { donationController } = require ('./app/controllers/donationController')
const app = express()
app.use(cors())

app.use(express.json())

app.use('/users', usersController)
app.use('/category', categoryController)
app.use('/donation', donationController)

app.listen(port, () => {
    console.log('connected to port ', port)
})