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

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};