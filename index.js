const express = require('express')
const port = 3005
const {mongoose} = require('./config/databse')
const {usersController} = require('./app/controllers/userController')

const app = express()
app.use(express.json())

app.use('/users', usersController)

app.listen(port, () => {
    console.log('connected to port ', port)
})