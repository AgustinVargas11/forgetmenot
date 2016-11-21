'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reminderSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
        required: true
    },
    reminderFrequency: Number,
    deadline: Date,
    complete: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);