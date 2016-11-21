'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);