require('./db/connect')
const express = require('express');
const appDebug = require('debug')('app:debug');
const {Course} = require('./models/course');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

let course = new Course({
    title : 'Angular',
    author : ' S. Saoudi',
    tags : ['front', 'ts'],
    isPublished : 'false'
});

//console.log( course.save());

app.listen(port, () => appDebug(`Server on ${port}`));