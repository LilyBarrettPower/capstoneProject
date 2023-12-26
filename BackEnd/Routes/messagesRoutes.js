const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.messageController.getMessage(res);
});

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