const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

router.get('/', (req, res) => {
    Controllers.userController.getUser(res);
});

router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res);
})

router.put('/:UserID', (req, res) => {
    Controllers.userController.updateUser(req, res);
})

router.delete('/:UserID', (req, res) => {
    Controllers.userController.deleteUser(req, res);
})

module.exports = router;