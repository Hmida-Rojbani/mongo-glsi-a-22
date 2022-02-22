require('./db/connect')
const express = require('express');
const appDebug = require('debug')('app:debug');
const course_router = require('./routers/courses');
const author_router = require('./routers/authors');
const user_router = require('./routers/users');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/courses',course_router);
app.use('/api/authors',author_router);
app.use('/api/users',user_router);

//console.log( course.save());

app.listen(port, () => appDebug(`Server on ${port}`));