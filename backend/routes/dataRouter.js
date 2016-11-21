'use strict';

var express = require('express');
var dataRouter = express.Router();

var User = require('../models/userSchema.js')

dataRouter.route('/')
    .get(function (req, res) {
        var field = req.query.field;
        User.find({}, field, function (err, users) {
            if (err) return res.status(401).send(err)
            res.send(users);
        })
    })

module.exports = dataRouter;