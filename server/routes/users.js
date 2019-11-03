const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const userModel = require('../model/userModel');
const secretKey = require('../keys').secret;
const saltRounds = 10;

router.post('/',[
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    userModel.findOne({email: {"$regex": email, "$options": "i"}})
        .then(result => {
            if (result) {
                res.status(409).send(`Email: '${email}' already exists`);
            } else {
                let salt = bcrypt.genSaltSync(saltRounds);
                let hashedPassword = bcrypt.hashSync(password, salt);

                const newUser = new userModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                });

                newUser.save()
                    .then(user => {
                        res.send(user)
                    })
                    .catch(err => {
                        res.status(500).send("Server error " + err)
                    })
            }
        })
        .catch(err => console.log(err));
});

router.post('/login',[
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    userModel.findOne({email: {"$regex": email, "$options": "i"}})
        .then(existingUser => {
            if (existingUser) {
                let passwordsMatch = bcrypt.compareSync(password, existingUser.password);

                if (!passwordsMatch) {
                    res.status(401).json({
                        success: false,
                        token: null
                    });
                } else {
                    const payload = {
                        id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email,
                    };
                    const options = {expiresIn: 2592000};
                    jwt.sign(
                        payload,
                        secretKey,
                        options,
                        (err, token) => {
                            if (err) {
                                res.status(401).json({
                                    success: false,
                                    token: null
                                });
                            } else {
                                res.status(401).json({
                                    success: true,
                                    token: token
                                });
                            }
                        }
                    );
                }
            } else {
                res.status(401).json({
                    success: false,
                    token: null
                });
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;