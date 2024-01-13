'use strict';

const Models = require('../Models');
const { Op } = require('sequelize');

// controller to get items, used in the search and filter functions
const getAllItems = async (req, res) => {
    try {
        const { searchQuery, category, minPrice, maxPrice } = req.query;

        // create an empty object to store the conditions for the DB query 
        const whereCondition = {};

        // Add search query condition
        if (searchQuery) {
            // match the itemName to the search query 
            whereCondition.ItemName = { [Op.like]: `%${searchQuery}%` };
        }
        // Add category filter condition
        if (category) {
            // match the item category to the catergoy chosen from drop down list
            whereCondition.ItemCategory = category;
        }
        // Add price range filter condition
        if (minPrice && maxPrice) {
            // match the item price to the range given
            whereCondition.ItemPricePerDay = { [Op.between]: [minPrice, maxPrice] };
        } else if (minPrice) {
            // if only min price is specified:
            whereCondition.ItemPricePerDay = { [Op.gte]: minPrice };
        } else if (maxPrice) {
            // if only max price is specified:
            whereCondition.ItemPricePerDay = { [Op.lte]: maxPrice };
        }
        // retrieve the items from the database with the given conditions:
        const items = await Models.Item.findAll({
            where: whereCondition,
        });

        res.status(200).json({ result: 200, data: items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 500, error: "Internal Server Error" });
    }
};




// controller to get the renteditemscard depending on whos logged in:
const getRentedItems = async (req, res) => {
    console.log(req.params);
    try {
        // destructure and extract UserID from the request paramaters:
        const { UserID } = req.params;
        // Ensure UserID is a valid number
        const userId = parseInt(UserID, 10);
        // if the userID isn't a number, throw an error
        if (isNaN(userId)) {
            return res.status(400).json({ result: 400, error: 'Invalid UserID' });
        }
        // retrieve the items from the database based on the given userID
        const items = await Models.Item.findAll({
            where: { UserID: userId },
        });

        res.status(200).json({ result: 200, data: items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 500, error: error.message });
    }
};

// Generic get all items controller used in testing:
const getItem = (res) => {
    Models.Item.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// controller to create an item used in the create post modal:
const createItem = async (req, res) => {
    try {
        // destructure and extract properties from req.body
        const {
            UserID,
            ItemCategory,
            ItemName,
            ItemDescription,
            ItemPricePerDay,
            ItemFeaturedDescription,
            ItemLocation,
            Availability,
        } = req.body;

        console.log('UserID:', UserID);

// create the new item:
        const newItem = new Models.Item({
            UserID: parseInt(UserID, 10), //ensure UserID is an INT
             ItemCategory,
            ItemName,
             ItemDescription,
           ItemPricePerDay,
            ItemFeaturedDescription,
             ItemLocation,
            Availability,
        });


        // Handle ItemFeaturedPhoto - construct URL based on the local server and file name
        if (req.files['ItemFeaturedPhoto'] && req.files['ItemFeaturedPhoto'][0]) {
            newItem.ItemFeaturedPhoto = `http://localhost:3307/uploads/${req.files['ItemFeaturedPhoto'][0].filename}`;
        }

        // Handle ItemOtherPhotos - construct URL based on local server and file name
        if (req.files['ItemOtherPhotos'] && req.files['ItemOtherPhotos'].length > 0) {
            newItem.ItemOtherPhotos = req.files['ItemOtherPhotos'].map(file => `http://localhost:3307/uploads/${file.filename}`);
        } else {
            newItem.ItemOtherPhotos = []; // Ensure it's an array even if there are no photos
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
    
// generic update item controller used for testing:
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

// delete item controller based on the itemID used to remove a listing 
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
    getAllItems,
    getRentedItems,
    createItem,
    updateItem,
    deleteItem,
    getItem,
}