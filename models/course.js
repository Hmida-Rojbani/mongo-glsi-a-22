const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title : String,
    author : String,
    tags : [String],
    date : {type :Date, default: Date.now()},
    isPublished : Boolean
});

let Course = mongoose.model('Course',courseSchema);

module.exports.Course=Course;