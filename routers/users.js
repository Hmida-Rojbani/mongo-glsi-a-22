const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, validation_user,validation_user_login} = require('../models/user');

router.post('/signup',async (req,res) =>{
    let validation_results = validation_user.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    try {
        let salt = await bcrypt.genSalt(10);
        //console.log('salt : ',salt);
        let user = new User(req.body);
        user.password = await bcrypt.hash(user.password,salt);
        //console.log('hash : ', user.password);
        await user.save();
        res.status(201).send('User registred')
    } catch (error) {
        res.status(400).send('Registration error : '+ error.message)
    }  
    
});

router.post('/signin',async (req,res) =>{
    let validation_results = validation_user_login.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    try {
        let user = await User.findOne({email : req.body.email});
        if(! user )
            res.status(400).send('Username or password is uncorrect');
        let bool = await bcrypt.compare(req.body.password,user.password);
        if(! bool )
            res.status(400).send('Username or password is uncorrect');
        const token = jwt.sign({_id: user._id, name : user.name},'jwt-secret');
        res.header('x-auth-token',token).send('Sign in success!!');
    } catch (error) {
        res.status(400).send('Registration error : '+ error.message)
    }  
    
});

module.exports=router