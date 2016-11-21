'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var expressJwt = require('express-jwt');
var mailer = require('./mailer/mailer.js');

var app = express();
var port = process.env.PORT || 8002;

var config = require('./config.js');
var todoRouter = require('./routes/todoRouter.js');
var authRoutes = require('./routes/authRoutes.js');
var noteRouter = require('./routes/noteRouter.js');
var dataRouter = require('./routes/dataRouter.js');
var userRoute = require('./routes/userRoute.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '..', 'frontend')));


app.use('/api', expressJwt({
    secret: config.secret
}));
app.use('/api/todos', todoRouter);
app.use('/api/notes', noteRouter);
app.use('/api/user', userRoute);
app.use('/auth', authRoutes);
app.use('/data', dataRouter);


mongoose.connect(config.database, function () {
    console.log('Connected to mongodb...');
});

app.listen(port, function () {
    console.log('Server running on port', port + '...');
});