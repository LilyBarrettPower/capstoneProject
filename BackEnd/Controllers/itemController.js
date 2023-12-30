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

const createItem = async (req, res) => {
    try {
        const {
            UserID,
            ItemCategory,
            ItemName,
            ItemDescription,
            ItemPricePerDay,
            ItemFeaturedDescription,
            ItemLocation,
            Availability,
            // ItemFeaturedPhoto,
            // ItemOtherPhotos,
        } = req.body;

        console.log('UserID:', UserID);


        const newItem = new Models.Item({
            UserID: parseInt(UserID, 10),
             ItemCategory,
            ItemName,
             ItemDescription,
           ItemPricePerDay,
            ItemFeaturedDescription,
             ItemLocation,
            Availability,
        //     ItemFeaturedPhoto,
        //    ItemOtherPhotos,
        });


        // Handle ItemFeaturedPhoto
        if (req.files['ItemFeaturedPhoto'] && req.files['ItemFeaturedPhoto'][0]) {
            newItem.ItemFeaturedPhoto = req.files['ItemFeaturedPhoto'][0].path;
        }

        // Handle ItemOtherPhotos
        if (req.files['ItemOtherPhotos'] && req.files['ItemOtherPhotos'].length > 0) {
            newItem.ItemOtherPhotos = req.files['ItemOtherPhotos'].map(file => file.path);
        }

        await newItem.save();

        res.status(201).json({
            result: 200,
            item: {
                UserID: newItem.UserID,
                ItemCategory: newItem.ItemCategory,
                ItemName: newItem.ItemName,
                ItemDescription: newItem.ItemDescription,
                ItemPricePerDay: newItem.ItemPricePerDay,
                ItemFeaturedDescription: newItem.ItemFeaturedDescription,
                ItemLocation: newItem.ItemLocation,
                Availability: newItem.Availability,
                ItemFeaturedPhoto: newItem.ItemFeaturedPhoto,
                ItemOtherPhotos: newItem.ItemOtherPhotos,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            result: 500,
            error: err.message,
        });
    }
};
    

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