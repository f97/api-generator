const express = require('express');
const router = express.Router();
const { Users } = require('../models/usersModel')

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
    next();
});

/**
 * @typedef Users
 * @property {string} email.required
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} passwordConf.required
 */

/**
 * @route POST /users
 * @group Users
 * @param {Users.model} users.body.required
 * @returns {} Signin
 */

//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = 'Passwords do not match.';
        res.status(400).json({ err: err, data: null });
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        Users.create(userData, function (error, user) {
            if (error) {
                res.status(400).json({ err: error, data: null });
            } else {
                req.session.userId = user._id;
                return res.redirect('/user');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        Users.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                res.status(401).json({ err: err, data: null });
            } else {
                req.session.userId = user._id;
                return res.redirect('/users');
            }
        });
    } else {
        var err = new Error('All fields required.');
        res.status(400).json({ err: err, data: null });
    }
})

// GET route after registering
router.get('/', function (req, res, next) {
    Users.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                res.status(500).json({ err: error, data: null });
            } else {
                if (user === null) {
                    let err = 'Not authorized!';
                    res.status(400).json({ err: err, data: null });
                } else {
                    res.status(200).json({ err: null, data: user });
                }
            }
        });
});


// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                res.status(500).json({ err: err, data: null });
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;