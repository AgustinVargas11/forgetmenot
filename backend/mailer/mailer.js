'use strict';

// var express =
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var config = require('../config.js');

var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
var cron = require('node-cron');

var Reminder = require('../models/reminderSchema.js');

// Reminder.find({
//     user
// })

// var mailOptions = {
//     from: '"Forget Me Not?" <forgetmenot.agustin@gmail.com>', // sender address
//     subject: 'Welcome to Forget Me Not', // Subject line
//     text: 'Hi ' + user.name, // plaintext body
//     html: '<br>Thanks for signing up to Forget Me Not. Now go create and complete some tasks! <br>Take some notes!<br><b>Agustin Vargas</b><br><b>Forget Me Not</b>' // html body
// };


// console.log(process.env.SENDGRID_USERNAME)

// var transporter = nodemailer.createTransport(options[, defaults])

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });