'use strict';

var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
var config = require('../config.js');

var User = require('../models/userSchema.js');



authRouter.route('/signup')

.post(function (req, res) {

    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) return res.status(500).send(err);

        var options = {
            auth: {
                api_key: config.sendgridAPIKey
            }
        };

        var mailer = nodemailer.createTransport(sgTransport(options));
        var email = {
            to: user.email,
            from: 'forgetmenot.agustin@gmail.com',
            subject: 'Welcome to Forget Me Not',
            html: '<div style="font-family: Tahoma;width: 70%; height: 85%; margin: 0 auto; background: linear-gradient(180deg, #f5f5f5, #FEFEFE);"><div style=" background: rgb(38, 166, 154); box-sizing: border-box; height: 60px; width: 100%; text-align: left; color: #FEFEFE; padding: .325em; line-height: 1.5"> <b><h2>Forget Me Not</h2></div><br><div style="text-align:center; color: #3f3f3f; font-size: 1.3em;"><h3 style="margin: .25em; color: cadetblue;">Greetings</h3><h4 style="margin: .25em;color: #4f4f4f;">Welcome to Forget Me Not</h4></div><div style="margin: 1em; color: #3f3f3f;text-align: center;font-family: Georgia; font-size: 1em"><p>Forget Me Not helps you prioritize tasks and keep your life in order. Now go create and complete some tasks, or take some notes!</p></div><br><br>  <div style="text-align: left;padding-left: 1em;color: #3f3f3f; font-family: Georgia">warm regards,<br><b>Agustin Vargas</b><br>CEO<br>Forget Me Not </div></div>'
        };
        console.log("email ", email);
        mailer.sendMail(email, function (err, res) {
            if (err) {
                console.log(err)
            }
            console.log(res);
        });

        res.send({
            user: user,
            success: true,
            message: 'Successfully created user'
        });
    });
})

authRouter.route('/login')
    .post(function (req, res) {
        User.findOne({
            username: req.body.username.toLowerCase()
        }, function (err, user) {
            if (err) res.status(500).send(err);
            if (!user) {
                res.status(401).send({
                    success: false,
                    message: "This user does not exist"
                });
            } else if (user) {
                user.checkPassword(req.body.password, function (err, match) {
                    if (err) throw (err);
                    if (!match) res.status(401).json({
                        success: false,
                        message: "Username and password do not match"
                    });
                    else {
                        var token = jwt.sign(user.toObject(), config.secret, {
                            expiresIn: "24h"
                        });
                        res.json({
                            token: token,
                            user: user.withoutPassword(),
                            success: true,
                            message: "Login successful, token granted."
                        });
                    }
                });
            }
        });
    });

module.exports = authRouter;