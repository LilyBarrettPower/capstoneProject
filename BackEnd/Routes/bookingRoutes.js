const express = require('express');
const router = express.Router();

const Controllers = require('../Controllers')


router.get('/', (req, res) => {
    Controllers.bookingController.getBookings(req, res)
});

router.post('/create', (req, res) => {
    Controllers.bookingController.createBooking(req, res)
})

// get bookings by the userID
router.get('/getbooked/:UserID', (req, res) => {
    Controllers.bookingController.getBookedItemById(req.params.UserID, res);
});

// get bookings by the item ID
router.get('/getbookedbyitem/:ItemID', (req, res) => {
    Controllers.bookingController.getBookedItemByItemID(req.params.ItemID, res);
});

router.delete('/:BookingID', (req, res) => {
    Controllers.bookingController.deleteBooking(req, res);
})

module.exports = router;