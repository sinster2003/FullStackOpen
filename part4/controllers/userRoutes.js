const User = require('../models/users');
const userRouter = require("express").Router();
const bcrypt = require('bcrypt');

userRouter.get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;

    if(!username || !name) {
        return res.status(400).json({ message: "Username and Name are mandatory." });
    }

    if(username.length < 3 || name.length < 3) {
        return res.status(400).json({ message: "Username and Name must be atleast 3 characters long." });
    }
 
    if(!password || (password && password.length < 6)) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        password: hashedPassword
    })

    await user.save();
    res.status(201).json({ message: "User posted successfully" });
})

module.exports = userRouter;