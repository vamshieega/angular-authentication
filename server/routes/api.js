const express = require('express')
const jwt = require('jsonwebtoken')    

const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose');
const user = require('../models/user');

const db="mongodb+srv://vamshieega:14122251@cluster0.ihgkg.mongodb.net/eventsDB?retryWrites=true&w=majority";

mongoose.connect(db, err =>{
    if(err){
        console.log("Error:"+err)
    }
    else{
        console.log("establiehse mg DB")
    }
})    

router.get('/',(req,res)=>{
    res.send("From API ROUTE")
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData) 
    user.save((error,registeredUser)=>{
        if(error){
            console.log("Error :"+error)
        }
        else{
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'mySecretKey')
            res.status(200).send({token})
        }
    })

})

    function verifyToken(req,res,next){
        if(!req.headers.authorization){
            return res.status(401).send("Unauthorized Request")
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token==="null"){
            return res.status(401).send("Unauthorized Request")
        }
        let payload = jwt.verify(token,'mySecretKey')
        if(!payload){
            return res.status(401).send("Unauthorized Request")
        }
        req.userId = payload.subject
        next()
    }

 router.post('/login',(req,res)=>{
     let userData = req.body
     user.findOne({email:userData.email},(error,user)=>{
         if(error){
             console.log("Error :"+error)
         }
         else{
             if(!user){
                 res.status(401).send("Invalid Email")
             }
             else if(user.password != userData.password){
                 res.status(401).send("Invalid Password")
             }
             else{
                 let payload = {subject : user._id}
                 let token = jwt.sign(payload,'mySecretKey')
                 res.status(200).send({token})
             }
         }
     })
 })   

router.get('/events',verifyToken,(req,res)=>{

    let events = [
        {
            
        "_id" : "1",
        "name":"VAmshi eega",
        "description" :"Events Card",
        "date" : "2/25/2013 "
        },
        {
            
            "_id" : "2",
            "name":"VAmshi eega",
            "description" :"Events cdscCard",
            "date" : "2/25/2013 "
            },
            {
            
                "_id" : "3",
                "name":"VAmshi eega",
                "description" :"Events Card",
                "date" : "2/25/2013 "
                },
                {
            
                    "_id" : "4  ",
                    "name":"VAmshi eega",
                    "description" :"Events Card",
                    "date" : "2/25/2013 "
                    }
    ]

    res.json(events);

})


router.get('/special',(req,res)=>{

    let specialEvents = [
        {
            
        "_id" : "1",
        "name":"VAmshi eega",
        "description" :"Events Card",
        "date" : "2/25/2013 "
        },
        {
            
            "_id" : "2",
            "name":"VAmshi eega",
            "description" :"Events Card 32",
            "date" : "2/25/2013 "
            },
            {
            
                "_id" : "3",
                "name":"VAmshi eega",
                "description" :"Events Card",
                "date" : "2/25/2013 "
                },
                {
            
                    "_id" : "4  ",
                    "name":"VAmshi eega",
                    "description" :"Events Card",
                    "date" : "2/25/2013 "
                    }
    ]

    res.json(specialEvents);

})




module.exports = router;