'use strict';

const Models = require('../Models');

const getUser = (res) => {
    Models.User.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createUser = (data, res) => {
    Models.User.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const updateUser = (req, res) => {
    Models.User.update(req.body, {
        where: {UserID : req.params.UserID}
    }) 
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const deleteUser = (req, res) => {
    Models.User.destroy({
        where: {UserID: req.params.UserID}
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const registerUser = async (req, res) => {
    try {
        const {
            FullName,
            UserName,
            Email,
            Password,
            Contact,
            Location,
            ProfilePhoto
        } = req.body;

        if (!(Email && Password && FullName && UserName && Contact && Location && ProfilePhoto)) {
            res.status(400).json({ result: "All input is required" });
        } else if (Password.length < 6) {
            res.status(400).json({ result: "Password must be at least 6 characters long" });
        } else if (Password === Email) {
            res.status(400).json({ result: "Password cannot be the same as your email address" });
        } else if (!/^[A-Za-z\s\-]+$/i.test(FullName)) {
            res.status(400).json({ result: "Invalid  name" });
        } else {
            const oldUser = await Models.User.findOne({ where: { Email } });
            if (oldUser) {
                res.status(409).json({ result: "This email address already has an account. Please login!" });
                return;
            }
        }
        const userData = await Models.User.create({
            FullName,
            UserName,
            Email: Email.toLowerCase(),
            Password, //encrypt password here!
            Contact,
            Location,
            ProfilePhoto,
        });
        const user = userData.get({ plain: true })
        
        //create token here??

        res.status(200).json({ result: 'User registration successful', data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message });
    }
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser
};