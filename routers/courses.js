const router = require('express').Router();
const {Course, course_validation} = require('../models/course');
// get all documents from courses
router.get('',async (req,res) =>{
    let courses = await Course.find();
    res.send(courses);
});

// add course to db
// add joi to validate  
router.post('',async (req,res) =>{
    let validation_results = course_validation.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    let course = new Course(req.body);
    course = await course.save();
    res.send(course);
});





module.exports=router;