'use strict';

const Models = require('../Models');
// for password encryption
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// get all users:
const getUser = (res) => {
    Models.User.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// create a user:
const createUser = (data, res) => {
    Models.User.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

// update a user:
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

// delete a user:
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

// new register user controller::::::
const registerUser = async (req, res) => {
    try {
        // descrtucture req.body
        const { FullName, UserName, Email, Password, Contact, Location, } = req.body;

        console.log('email', Email);  //testing
        console.log('username', UserName);  //testing

        // validation - check al fields are filled in
        if (!FullName || !UserName || !Email || !Password || !Contact || !Location) {
            return res.status(400).json({ error: 'all fields are required' });
        }
        // check if the email is already in use
        const existingUser = await Models.User.findOne({ where: {Email}});
        if (existingUser) {
            return res.status(400).json({ error: 'Email already taken' });
        };

        // Handle the profile photo:
        let profilePhoto = null;
        if (req.file) {
            profilePhoto = `http://localhost:3307/uploads/${req.file.filename}`;
            console.log(profilePhoto);
        }

        // encrypt the password here:
        const hashedPassword = await bcrypt.hash(Password, 10);
       
        
        // create a new user 
        const newUser = new Models.User({
            FullName,
            UserName,
            Email,
            Password: hashedPassword, //encyrpt password here!
            Contact,
            Location,
            ProfilePhoto: profilePhoto
        });

        await newUser.save();


        // obtain the UserID
        const UserID = newUser.UserID;

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                UserID,
                Email: newUser.Email,
                UserName: newUser.UserName,
                FullName: newUser.FullName,
                Contact: newUser.Contact,
                Location: newUser.Location,
                ProfilePhoto: newUser.ProfilePhoto
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// controller for loggin in the users 
 
const loginUser = async (req, res) => {
    try {
        // destructure the req.body
        const { Email, Password } = req.body

        // Validate if user is in the database, throw error if email is not registered
        const user = await Models.User.findOne({ where: { Email } });
        if (!user) {
            return res.status(400).json({message: 'This email is not registered'})
        }
        // match the password to the encrypted password in the database 
        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (passwordMatch) {
            // if the passwords match, log the user in
            res.status(200).json({
                message: 'User successfully logged in',
                user: {
                    UserID: user.UserID,
                    Email: user.Email,
                    UserName: user.UserName,
                    FullName: user.FullName,
                    Contact: user.Contact,
                    Location: user.Location,
                    ProfilePhoto: user.ProfilePhoto
                }
            });
        } else {
            res.status(401).json({error: 'login failed'})
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({result: error})
    }
};

// controller for searching users for messaging:
const searchUsers = async (query, res) => {
    try {
        const users = await Models.User.findAll({
            // find records where the username contains teh query string:
            where: {
                UserName: {
                    [Op.like]: `%${query}%`,
                },
            },
            attributes: ['UserID', 'UserName'], // Include the needed attributes
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get user details by UserID:
const getUserByUserID = (userID, res) => {
    Models.User.findByPk(userID)
        .then(data => {
            if (data) {
                res.send({ result: 200, data: data });
            } else {
                res.send({ result: 404, error: 'User not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    searchUsers,
    getUserByUserID
};



