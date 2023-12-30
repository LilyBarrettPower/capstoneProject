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
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Use 'upload.fields' to handle multiple files with different field names
const uploadMiddleware = upload.fields([
    { name: 'ItemFeaturedPhoto', maxCount: 1 },
    { name: 'ItemOtherPhotos', maxCount: 5 }, // Adjust maxCount as needed
]);


const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.itemController.getItem(res);
});


router.post('/create', uploadMiddleware, (req, res) => {
    console.log(req.body);
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
