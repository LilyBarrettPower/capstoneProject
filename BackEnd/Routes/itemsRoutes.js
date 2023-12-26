const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.itemController.getItem(res);
});

router.post('/create', (req, res) => {
    Controllers.itemController.createItem(req.body, res);
})

router.put('/:ItemID', (req, res) => {
    Controllers.itemController.updateItem(req, res);
})

router.delete('/:ItemID', (req, res) => {
    Controllers.itemController.deleteItem(req, res);
})

module.exports = router;