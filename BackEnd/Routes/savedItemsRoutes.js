const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.savedItemController.getSavedItem(res);
});

router.post('/create', (req, res) => {
    Controllers.savedItemController.createSavedItem(req.body, res);
})

router.put('/:SavedItemID', (req, res) => {
    Controllers.savedItemController.updateSavedItem(req, res);
})

router.delete('/:SavedItemID', (req, res) => {
    Controllers.savedItemController.deleteSavedItem(req, res);
})

module.exports = router;