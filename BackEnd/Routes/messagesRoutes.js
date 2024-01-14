const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.messageController.getMessage(res);
});

// route to get messages by userID
router.get('/getmessages/:UserID', (req, res) => {
    const { UserID } = req.params;
    console.log('UserID:', UserID);  // Add this line for debugging
    Controllers.messageController.getMessageByUserId(UserID, res);
})

// route to get messages by username
router.get('/byusername/:UserName', (req, res) => {
    const { UserName } = req.params;
    Controllers.messageController.getMessagesByUserName(UserName, res);
})

// route to create a message 
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