const express = require('express');
const router = express.Router();

const multerMiddleware = require('../Middleware/multerMiddleware')
const Controllers = require('../Controllers')


// General CRUD operations:
router.get('/', (req, res) => {
    Controllers.userController.getUser(res);
});

// route for searching users for the messaging
router.get('/search', (req, res) => {
    const { query } = req.query;
    Controllers.userController.searchUsers(query, res);
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

router.post('/login', (req, res) => {
    Controllers.userController.loginUser(req, res);
})

// router for the profile picture upload
router.post('/register', multerMiddleware([{ name: 'ProfilePhoto', maxCount: 1 }]), Controllers.userController.registerUser);




module.exports = router;