const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.messageController.getMessage(res);
});

router.get('/getmessages/:UserID', (req, res) => {
    const { UserID } = req.params;
    console.log('UserID:', UserID);  // Add this line for debugging
    Controllers.messageController.getMessageByUserId(UserID, res);
})

router.post('/create', (req, res) => {
    Controllers.messageController.createMessage(req.body, res);
})

router.put('/:MessageID', (req, res) => {
    Controllers.messageController.updateMessage(req, res);
})

router.delete('/:MessageID', (req, res) => {
    Controllers.messageController.deleteMessage(req, res);
})

module.exports = router;