const express = require("express");
const router = express.Router();
const userModel = require('../model/userModel');

router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    userModel.find({email: {"$regex": email, "$options": "i"}})
        .then(result => {
            if (result.length > 0) {
                res.status(409).send(`Email: '${email}' already exists`);
            } else {
                const newUser = new userModel({
                    name: name,
                    email: email,
                    password: password,
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

module.exports = router;