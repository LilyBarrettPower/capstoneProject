const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')
// import the upload middleware
const multerMiddleware = require('../Middleware/multerMiddleware');

// route to get all items from the DB for the itemcards:
router.get('/getall', (req, res) => {
    Controllers.itemController.getAllItems(req, res);
});

// route for getting the rented items by userID:
router.get('/getrented/:UserID', (req, res) => {
    Controllers.itemController.getRentedItems(req, res);
});

router.get('/', (res) => {
    Controllers.itemController.getItem(res);
});

// route to create an item in the database (createpostmodal):
router.post('/create', multerMiddleware([
    { name: 'ItemFeaturedPhoto', maxCount: 1 },
    { name: 'ItemOtherPhotos', maxCount: 5 },
]), (req, res) => {
    console.log('Request Body:', req.body); // testing
    console.log('Request Files:', req.files);  // testing
    Controllers.itemController.createItem(req, res);
});

router.put('/:ItemID', (req, res) => {
    Controllers.itemController.updateItem(req, res);
})

router.delete('/:ItemID', (req, res) => {
    Controllers.itemController.deleteItem(req, res);
})

module.exports = router;
