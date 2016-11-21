'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    displayUserName: String,
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    notes: {
        type: Number,
        default: 0
    },
    completedTasks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    this.displayUsername = this.username;
    this.username = this.username.toLowerCase();
    next();
});

userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);