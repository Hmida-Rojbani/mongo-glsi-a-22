const router = require('express').Router();
const {Course, course_validation, course_validation_update, object_id_validation} = require('../models/course');
// get all documents from courses
router.get('',async (req,res) =>{
    let courses = await Course.find();
    res.send(courses);
});

// add course to db
// add joi to validate  
// TODO change post to support the new collection
router.post('',async (req,res) =>{
    let validation_results = course_validation.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    let course = new Course(req.body);
    try {
        course = await course.save();
        res.send(course);
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

// get all documents from courses with given title
router.get('/title/:t',async (req,res) =>{
    let courses = await Course.find({title : req.params.t});
    res.send(courses);
});

// get all documents from courses with titles start with  
router.get('/title/start/:prefixe',async (req,res) =>{
    let courses = await Course.find({title : new RegExp('^'+req.params.prefixe,'i')},'title author price -_id')
                                .sort({author : 1, price : 1})
                                .skip(1)
                                .limit(2);
    res.send(courses);
});

// get all documents from courses with price > val 
router.get('/price/over/:p',async (req,res) =>{
    let courses = await Course.find({price : { $gte : req.params.p }})
                                
    res.send(courses);
});

// get all documents from courses with price < val 
//operators 
// $eq, $neq
// $lt, $lte, $gt, $gte
// $in, $nin

router.get('/price/under/:p',async (req,res) =>{
    let courses = await Course.find({price : { $lte : req.params.p }})
                                
    res.send(courses);
});

// router.get('/price/in/:minp/:maxp',async (req,res) =>{
//     let courses = await Course.find({price : { $lte : req.params.maxp, $gte : req.params.minp }})
                                
//     res.send(courses);
// });

router.get('/price/in/:minp/:maxp',async (req,res) =>{
    let courses = await Course.find({price : { $lte : req.params.maxp }})
                                .and({price : { $gte : req.params.minp }})
                                
    res.send(courses);
});

// get all elts if isPublished true, price over 700
router.get('/price/published/over/:p',async (req,res) =>{
    let courses = await Course.find({price : { $gte : req.params.p }, isPublished : true})
                                
    res.send(courses);
});

//
router.put('/:id',async (req,res) =>{
   // Course.findByIdAndUpdate
    let validation_results = course_validation_update.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
        validation_results = object_id_validation.validate(req.params);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    try {
        await Course.updateOne({_id: req.params.id},req.body);
        res.send(await Course.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Problem in updating Course')
    }
        
});

router.delete('/:id',async (req,res) =>{
    
    let validation_results = object_id_validation.validate(req.params);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    try {
        let course = await Course.findByIdAndRemove(req.params.id);
        if(! course )
            return res.status(404).send('Course Id not found');
        res.send(course);
    } catch (error) {
        res.status(400).send('Problem in Delete Course')
    }
});
module.exports=router;