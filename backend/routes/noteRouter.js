'use strict';

var express = require('express');
var noteRouter = express.Router();

var Note = require('../models/noteSchema.js');
var Todo = require('../models/todoSchema.js');
var User = require('../models/userSchema.js');

noteRouter.route('/')
    .get(function (req, res) {
        Note.find({
            user: req.user._id
        }, function (err, notes) {
            if (err) res.status(500).send(err);
            res.send(notes);
        })
    })
    .post(function (req, res) {
        var newNote = new Note(req.body);

        newNote.user = req.user;

        User.findById(req.user._id, function (err, foundUser) {
            foundUser.notes++;
            foundUser.save();
        });

        newNote.save(function (err, savedNote) {
            if (err) res.status(500).send(err);
            res.send(savedNote);
        });
    })

module.exports = noteRouter;