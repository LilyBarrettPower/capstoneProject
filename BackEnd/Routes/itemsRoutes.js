const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path')


const uploadDirectory = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Use 'upload.fields' to handle multiple files with different field names
const uploadMiddleware = upload.fields([
    { name: 'ItemFeaturedPhoto', maxCount: 1 },
    { name: 'ItemOtherPhotos', maxCount: 5 }, // Adjust maxCount as needed
]);


const Controllers = require('../Controllers')

// route to get all items from the DB for the itemcards:
router.get('/getall', (req, res) => {
    Controllers.itemController.getAllItems(req, res);
});

// route for getting the rented items:
router.get('/getrented/:UserID', (req, res) => {
    Controllers.itemController.getRentedItems(req, res);
});

router.get('/', (res) => {
    Controllers.itemController.getItem(res);
});

// route to create an item in the database (createpostmodal):
router.post('/create', uploadMiddleware, (req, res) => {
    console.log(req.body);
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);
    // Call the controller function to create the item
    Controllers.itemController.createItem(req, res);
});

router.put('/:ItemID', (req, res) => {
    Controllers.itemController.updateItem(req, res);
})

router.delete('/:ItemID', (req, res) => {
    Controllers.itemController.deleteItem(req, res);
})

module.exports = router;
