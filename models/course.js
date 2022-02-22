const mongoose = require('mongoose');
const Joi = require('joi');
const { number } = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

let courseSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        unique : true,
        minlength : 5
    },
    author : {
        name : {
            type : String,
            required: true
        },
        id : {
            type :mongoose.Schema.Types.ObjectId,
            ref : 'Author'
        }
    },
    tags : {
        type : [String],
        validate : {
            validator : function (val) {
                return val && val.length >=2 ;
            },
            message : 'A course must have at least two tags'
        }
    },
    date : {type :Date, default: Date.now()},
    isPublished : Boolean,
    price : {
        type: Number, 
        min : 10,
        required : function () {
            return this.isPublished;
        }
    }
});

let course_validation = Joi.object({
    title : Joi.string().min(5).max(30).alphanum().required(),
    author : Joi.string().min(5).max(50).pattern(new RegExp('^[a-zA-Z .]{5,50}$')).required(),
    tags : Joi.array().items(Joi.string().min(2)).required(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let course_validation_update = Joi.object({
    title : Joi.string().min(5).max(30).alphanum(),
    author : Joi.string().min(5).max(50).pattern(new RegExp('^[a-zA-Z .]{5,50}$')),
    tags : Joi.array().items(Joi.string().min(2)),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let object_id_validation = Joi.object({
    id : Joi.objectId().required()
});

let Course = mongoose.model('Course',courseSchema);

module.exports.Course=Course; 
module.exports.course_validation=course_validation; 
module.exports.course_validation_update=course_validation_update; 
module.exports.object_id_validation=object_id_validation; 