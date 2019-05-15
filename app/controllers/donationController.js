const express = require('express')
const router = express.Router()
const { Donation } = require('../models/donation')



router.get('/', function(req, res){
    Donation.find()
    .then(function(donation) {
        res.send(donation)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/', function(req, res){ 
    const body = req.body
    const donation = new Donation(body)
    donation.save()
        .then(function(donation){
            res.send(donation)
        })
        .catch(function(err){
            res.send(err)
        })
})


module.exports = {
    donationController : router
}