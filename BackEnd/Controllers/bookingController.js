

const Models = require('../Models');


// controller to create a booking
const createBooking = async (req, res) => {
    try {
        const { ItemID, RenterID, OwnerID, StartDate, EndDate } = req.body;

        // Calculate the status (days until the booking)
        const today = new Date();
        const status = Math.floor((new Date(EndDate) - today) / (1000 * 60 * 60 * 24));

        // If the booking has already passed, make the status negative
        if (new Date(StartDate) < today) {
            status *= -1;
        }

        // Create a new booking using the Booking model
        const newBooking = await Models.Booking.create({
            ItemID,
            RenterID,
            OwnerID,
            StartDate,
            EndDate,
            Status: status,
        });

        res.status(201).json({ data: newBooking, message: 'Booking created successfully.' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ result: 500, error: error.message }); 
    }
};

// controller to get the bookings, not used by front end...
const getBookings = (req, res) => {
    Models.Booking.findAll({})
        .then(data => res.status(200).json({ result: 200, data: data }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ result: 500, error: err.message });
        });
};

// controller to get the items that a user has booked which is rendered on home page of that user:
const getBookedItemById = (UserID, res) => {
    Models.Booking.findAll({
        where: {
            RenterID: UserID,
        },
        include: [Models.Item],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// controller to get the booked item by itemID which is used to render the booked dates on each item card
const getBookedItemByItemID = (ItemID, res) => {
    Models.Booking.findAll({
        where: {
            ItemID: ItemID,
        },
        include: [Models.Item],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// delete booking controller used in the delete booking button
const deleteBooking = (req, res) => {
    Models.Booking.destroy({
        where: { BookingID: req.params.BookingID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}


module.exports = {
    createBooking,
    getBookings,
    getBookedItemById,
    deleteBooking,
    getBookedItemByItemID
};