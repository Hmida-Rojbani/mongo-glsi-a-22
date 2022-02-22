const mongoose = require('mongoose');
const Joi = require('joi');

let author_schema = new mongoose.Schema({
    name : String,
    email : String,
    telephone : String,
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : ' Course'
        }
    ]
});

let validation_author = Joi.object({
    name : Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    telephone : Joi.string()
});

let validation_update_author = Joi.object({
    name : Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    telephone : Joi.string()
});

let Author = mongoose.model('Author',author_schema);

module.exports.Author = Author;
module.exports.validation_author = validation_author;
module.exports.validation_update_author = validation_update_author;