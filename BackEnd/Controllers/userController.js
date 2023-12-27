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

// new register user controller::::::
const registerUser = async (req, res) => {
    //let user; // Declare user variable outside the try block
    try {
        const { FullName, UserName, Email, Password, Contact, Location, } = req.body;

        console.log('email', Email);
        console.log('username', UserName);

        if (!FullName || !UserName || !Email || !Password || !Contact || !Location) {
            return res.status(400).json({ error: 'all fields are required' });
        }
        // const existingUser = await Models.User.findOne({
        //     $or: [
        //         { Email: { $regex: new RegExp(`^${Email}$`, 'i') } },
        //         { UserName: { $regex: new RegExp(`^${UserName}$`, 'i') } }
        //     ] });
        // if (existingUser) {
        //     return res.status(400).json({ error: 'Email or username already taken' });
        // }
        
        // create a new user 
        const newUser = new Models.User({
            FullName,
            UserName,
            Email,
            Password, //encyrpt password here!
            Contact,
            Location
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//         // Move user creation inside the try block
//         const userData = await Models.User.create({
//             FullName: user.FullName,
//             UserName: user.UserName,
//             Email: user.Email,
//             Password: user.Password, //encrypt password here!
//             Contact: user.Contact,
//             Location: user.Location,
//             // ProfilePhoto: req.body.ProfilePhoto,
//         });

//         user = userData.get({ plain: true });
//         // create token here??

//         res.status(200).json({ result: 'User registration successful', data: user });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).json({ result: 'Failed to register user', error: err.message });
//     }
// };

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser
};



// need to redo the whole userController file i think, its not working at all!!!