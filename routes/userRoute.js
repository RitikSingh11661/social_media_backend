const { Router } = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = Router();

userRoute.post('/register', async (req, res) => {
    const { name, password, email, gender } = req.body;
    if (name && password && email && gender) {
        const isPresent = await userModel.findOne({ email });
        if (!isPresent) {
            const hashed = await bcrypt.hash(password, 7);
            const user = await userModel({ name, email, gender, password: hashed });
            user.save();
            res.send('user registerd successfully')
        } else res.status(400).send({ err: 'user already exists with this email' });
    } else res.status(401).send({ err: 'somme details are missing' })
});

userRoute.post('/login', async (req, res) => {
    const { password, email } = req.body;
    if (password && email){
        const user = await userModel.findOne({email});
        console.log('user',user)
        if (user) {
            const hashCheck = await bcrypt.compare(password, user.password);
            const token = jwt.sign({ "userId": user._id }, "user", { expiresIn: "1h" });
            if (hashCheck) {
                res.status(200).send({ msg: "User logged in", status: "success", token });
            } else {
                res.status(400).send({ msg: "Invalid password" });
            }
        } else res.status(400).send({ err: 'user not exists with this email' });
    } else res.status(401).send({ err: 'somme details are missing' })
    res.send('login')
});

module.exports = userRoute;
