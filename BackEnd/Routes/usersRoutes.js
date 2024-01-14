const express = require('express');
const router = express.Router();

const path = require('path')
const multer = require('multer');


const Controllers = require('../Controllers')

// for profile picture upload
const uploadDirectory = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

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
router.post('/register', upload.single('ProfilePhoto'), Controllers.userController.registerUser);




module.exports = router;