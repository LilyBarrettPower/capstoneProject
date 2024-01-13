const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.savedItemController.getSavedItem(res);
});

// route to get the saved items for only the user logged in, based on the userID
router.get('/getsaved/:UserID', (req, res) => {
    Controllers.savedItemController.getSavedItemById(req.params.UserID, res);
});

// route to get the details of the saved items 
router.get('/getsaveddetails/:UserID', (req, res) => {
    const userId = parseInt(req.params.UserID, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ result: 400, error: 'Invalid UserID' });
    }

    Controllers.savedItemController.getSavedItemDetails(userId, res);
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