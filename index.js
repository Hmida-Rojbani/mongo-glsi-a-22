require('./db/connect')
const express = require('express');
const appDebug = require('debug')('app:debug');
const course_router = require('./routers/courses')
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/courses',course_router);

//console.log( course.save());

app.listen(port, () => appDebug(`Server on ${port}`));