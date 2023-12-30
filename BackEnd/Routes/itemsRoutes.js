const express = require('express');
const router = express.Router();

const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.itemController.getItem(res);
});

router.post('/create', upload.array('ItemOtherPhotos'), (req, res) => {
    console.log(req.body);
    Controllers.itemController.createItem(req, res);
});

router.put('/:ItemID', (req, res) => {
    Controllers.itemController.updateItem(req, res);
})

router.delete('/:ItemID', (req, res) => {
    Controllers.itemController.deleteItem(req, res);
})

module.exports = router;