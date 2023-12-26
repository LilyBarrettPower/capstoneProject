'use strict';

const Models = require('../Models');

const getItem = (res) => {
    Models.Item.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createItem = (data, res) => {
    Models.Item.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const updateItem = (req, res) => {
    Models.Item.update(req.body, {
        where: { ItemID: req.params.ItemID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const deleteItem = (req, res) => {
    Models.Item.destroy({
        where: { ItemID: req.params.ItemID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getItem,
    createItem,
    updateItem,
    deleteItem
}