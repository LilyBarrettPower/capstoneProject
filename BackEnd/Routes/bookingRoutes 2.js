const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')


router.get('/', (req, res) => {
    Controllers.bookingController.getBookings(req, res)
});

router.post('/create', (req, res) => {
    Controllers.bookingController.createBooking(req, res)
})

module.exports = router;