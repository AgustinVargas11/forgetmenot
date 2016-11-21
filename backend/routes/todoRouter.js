'use strict';

var express = require('express');
var todoRouter = express.Router();
var _ = require('lodash');

var Todo = require('../models/todoSchema.js');
var User = require('../models/userSchema.js');
var Reminder = require('../models/reminderSchema.js');


todoRouter.route('/')
    .get(function (req, res) {
        req.query.user = req.user._id
        Todo.find(req.query, function (err, todos) {
            if (err) return res.status(500).send(err);
            res.send(todos);
        }).sort({
            deadline: 1
        })
    })
    .post(function (req, res) {
        var newTodo = new Todo(req.body);
        newTodo.user = req.user;

        newTodo.save(function (err, newTodo) {
            if (err) return res.status(500).send(err);

            if (newTodo.reminderFrequency) {
                var reminderObj = _.cloneDeep(req.body);
                reminderObj.task = newTodo._id;
                reminderObj.user = req.user;
                var newReminder = new Reminder(reminderObj);
                newReminder.save(function (err, reminder) {
                    console.log(err)
                    if (err) return res.status(500).send(err);
                    console.log(reminder)
                });
            }

            res.status(201).send(newTodo);
        });
    });

todoRouter.route('/:todoId')
    .get(function (req, res) {
        Todo.findOne({
            _id: req.params.todoId,
            user: req.user._id
        }, function (err, foundTodo) {
            if (err) return res.status(500).send(err);
            if (!todo) return res.status(404).send('Todo item not found.');
            res.send(foundTodo);
        });
    })
    .put(function (req, res) {
        Todo.findOne({
            _id: req.params.todoId,
            user: req.user._id
        }, {
            new: true
        }, function (err, foundTodo) {
            if (err) return res.status(500).send(err);
            if (_.isEmpty(req.body)) {
                req.body.complete = true;
                User.findById(req.user._id, function (err, foundUser) {
                    foundUser.completedTasks++;
                    foundUser.save();
                });
            }
            foundTodo.update(
                req.body,
                function (err, updatedTodo) {
                    if (err) return res.status(500).send(err);
                    res.send(updatedTodo)
                });
        });
    })
    .delete(function (req, res) {
        Todo.findOneAndRemove({
            _id: req.params.todoId,
            user: req.user._id
        }, function (err, deletedTodo) {
            if (err) return res.status(500).send(err);
            res.send(deletedTodo);
        })
    });

module.exports = todoRouter;