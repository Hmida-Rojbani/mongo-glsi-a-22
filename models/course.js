const mongoose = require('mongoose');
const Joi = require('joi');

let courseSchema = new mongoose.Schema({
    title : String,
    author : String,
    tags : [String],
    date : {type :Date, default: Date.now()},
    isPublished : Boolean,
    price : Number
});

let course_validation = Joi.object({
    title : Joi.string().min(5).max(30).alphanum.required(),
    author : Joi.string().min(5).max(50).pattern(new RegExp('^[a-zA-Z/s]$')).required(),
    tags : Joi.array().items(Joi.string().min(2)).required(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let Course = mongoose.model('Course',courseSchema);

module.exports.Course=Course; 
module.exports.course_validation=course_validation; 