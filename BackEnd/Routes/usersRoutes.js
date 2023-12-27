const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')

// General CRUD operations:
router.get('/', (req, res) => {
    Controllers.userController.getUser(res);
});

// Can delete this route as have the register route! :) 
router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res);
})

router.put('/:UserID', (req, res) => {
    Controllers.userController.updateUser(req, res);
})

router.delete('/:UserID', (req, res) => {
    Controllers.userController.deleteUser(req, res);
})

// user registration route:
router.post('/register', (req, res) => {
    Controllers.userController.registerUser(req, res);
})

module.exports = router;