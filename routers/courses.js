const router = require('express').Router();
const {Course} = require('../models/course');
// get all documents from courses
router.get('',async (req,res) =>{
    let courses = await Course.find();
    res.send(courses);
});

// add course to db
// add joi to validate  
router.post('',async (req,res) =>{
    let course = new Course(req.body);
    course = await course.save();
    res.send(course);
});





module.exports=router;