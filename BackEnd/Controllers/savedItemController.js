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

// controller to get the saved items depending on whos logged in - by UserID
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


// controller for getting teh saveditems details for teh saveditem card
const getSavedItemDetails = (UserID, res) => {
    Models.SavedItem.findAll({
        where: { UserID: UserID },
        include: [Models.Item] // This will perform a join with the Item table to get the details of the saved item
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// controller to create the saved item, used when user saves an item
const createSavedItem = (data, res) => {
    Models.SavedItem.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

// generic update controller used in testing:
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

// delete controller used when users want to remove a saved item from their saved items list
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