const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const userRouter = express.Router();

userRouter.use(express.json())

userRouter.post('/register', async (ask, give) => {
    let { name, email, password } = ask.body;
    let user = await UserModel.findOne({ email });
    if (user) give.json({ "msg": "User already exists login to continue" });
    else {
        bcrypt.hash(password, 3, async (err, hashed) => {
            if (hashed) {
                let user = new UserModel({ name, email, 'password': hashed });
                await user.save();
                give.send({ "status": true, name })
            } else {
                give.send({ "status": false })
            }
        })
    }
});

userRouter.post('/login', async (ask, give) => {
    let { email, password } = ask.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        let hash = user.password;
        bcrypt.compare(password, hash, async (err, result) => {
            if (result) {
                let token = jwt.sign({ "_id": user._id }, "masai");
                give.send({ "status": true, "token": token, "name": user.name });
            } else {
                give.send({ "status": false })
            }
        })
    } else {
        give.send({ "status": "medium" })
    }

});

module.exports = {
    userRouter
}