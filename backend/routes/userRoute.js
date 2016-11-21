'use strict';

var express = require('express');
var userRoute = express.Router();

var User = require('../models/userSchema.js')

userRoute.route('/')
    .get(function (req, res) {
        User.findById(req.user, function (err, user) {
            if (err) return res.status(401).send(err);
            res.send(user.withoutPassword());
        })
    });

module.exports = userRoute;