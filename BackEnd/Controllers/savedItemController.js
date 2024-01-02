'use strict';

const Models = require('../Models');

const getSavedItem = (res) => {
    Models.SavedItem.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// controller to get the saved items depending on whos logged in 
const getSavedItemById = (userId, res) => {
    Models.SavedItem.findAll({
        where: { UserID: userId }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


// testing:
const getSavedItemDetails = (UserID, res) => {
    Models.SavedItem.findAll({
        where: { UserID: UserID },
        include: [Models.Item] // This will perform a join with the Item table
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createSavedItem = (data, res) => {
    Models.SavedItem.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const updateSavedItem = (req, res) => {
    Models.SavedItem.update(req.body, {
        where: { SavedItemID: req.params.SavedItemID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

const deleteSavedItem = (req, res) => {
    Models.SavedItem.destroy({
        where: { SavedItemID: req.params.SavedItemID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getSavedItem,
    getSavedItemById,
    getSavedItemDetails,
    createSavedItem,
    updateSavedItem,
    deleteSavedItem
}