'use strict';

const Models = require('../Models');
const { Op } = require('sequelize');


// TESTING:
const getAllItems = async (req, res) => {
    try {
        const { searchQuery, category, minPrice, maxPrice } = req.query;

        const whereCondition = {};

        // Add search query condition
        if (searchQuery) {
            whereCondition.ItemName = { [Op.like]: `%${searchQuery}%` };
        }

        // Add category filter condition
        if (category) {
            whereCondition.ItemCategory = category;
        }

        // Add price range filter condition
        if (minPrice && maxPrice) {
            whereCondition.ItemPricePerDay = { [Op.between]: [minPrice, maxPrice] };
        } else if (minPrice) {
            whereCondition.ItemPricePerDay = { [Op.gte]: minPrice };
        } else if (maxPrice) {
            whereCondition.ItemPricePerDay = { [Op.lte]: maxPrice };
        }

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
        const { UserID } = req.params;

        // Ensure UserID is a valid number
        const userId = parseInt(UserID, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ result: 400, error: 'Invalid UserID' });
        }

        const items = await Models.Item.findAll({
            where: { UserID: userId },
        });

        res.status(200).json({ result: 200, data: items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 500, error: error.message });
    }
};


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
            newItem.ItemFeaturedPhoto = `http://localhost:3307/uploads/${req.files['ItemFeaturedPhoto'][0].filename}`;
        }

        // Handle ItemOtherPhotos
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
    getAllItems,
    getRentedItems,
    createItem,
    updateItem,
    deleteItem,
    getItem,
}