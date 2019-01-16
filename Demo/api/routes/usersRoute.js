const express = require('express');
const router = express.Router();
const { Users } = require('../models/usersModel')

router.use((req, res, next) => {
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
 */

/**
 * @route POST /users/signin
 * @group Users
 * @param {Users.model} users.body.required
 * @returns {} Signin
 */

//POST route for updating data
router.post('/signin', (req, res, next) => {
    
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        Users.create(userData, (error, user) => {
            console.log(error);
            if (error) {
                res.status(400).json({ err: error, data: null });
            } else {
                req.session.userId = user._id;
                return res.redirect('/users');
            }
        });
    } else {
        let err = new Error('All fields required.');
        res.status(400).json({ err: err, data: null });
    }
})

/**
 * @route POST /users/login
 * @group Users
 * @param {string} email.query.required -  email
 * @param {string} password.query.required - user's password.
 * @returns {} Logs user into the system
 */

router.post('/login', (req, res, next) => {
    Users.authenticate(req.body.email, req.body.password, (error, user) => {
        if (error || !user) {
            let err = new Error('Wrong email or password.');
            res.status(401).json({ err: err, data: null });
        } else {
            req.session.userId = user._id;
            return res.redirect('/users');
        }
    });
})

/**
 * @route GET /users
 * @group Users
 * @returns {Users.model} get current user
 */

// GET route after registering
router.get('/', (req, res, next) => {
    Users.findById(req.session.userId)
        .exec((error, user) => {
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

/**
 * @route GET /users/logout
 * @group Users
 * @returns Logs out current logged in user session
 */

// GET for logout logout
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ err: err, data: null });
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;