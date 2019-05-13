const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const { authenticateUser } = require('../middlewares/authenticate')


//localhost:3005/users/register
router.post('/register', function(req, res){
    console.log()
    const {username, email, password} = req.body

    if( !username || !email || !password ){
        res.send({msg : 'Please enter all fields'})
    }
    if (password.length < 6) {
        res.send({ msg: 'Password must be at least 6 characters' });
    }
    if (username.length < 5 ){
        res.send({ msg : "username must be at least 5 character"})
    }
    else{
        const user = new User({
            username,
            email,
            password
          })
        user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
    }
    

})

//localhost:3005/users/login
router.post('/login', function(req, res){
    const body = req.body
    User.findByCredentials(body.email, body.password)
    .then(function(user){
        return user.generateToken()    //return Promise object
        })
        .then(function(token){
            res.setHeader('x-auth', token).send({})
        })
        .catch(function(err){
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, function(req, res){
    const { user, token} = req
    User.findByIdAndUpdate(user._id, { $pull : { tokens : {token : token }}})
    .then(function(){
        res.send('Successfully logged out')
    })
    .catch(function(err){
        res.send(err)
    })
})


module.exports = {
    usersController : router
}