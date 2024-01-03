

const Models = require('../Models');


const createBooking = async (req, res) => {
    try {
        const { ItemID, RenterID, OwnerID, StartDate, EndDate } = req.body;

        // Calculate the status (days until the booking)
        const today = new Date();
        const status = Math.floor((new Date(EndDate) - today) / (1000 * 60 * 60 * 24));

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
        res.status(500).json({ result: 500, error: error.message }); // Updated this line
    }
};

const getBookings = (req, res) => {
    Models.Booking.findAll({})
        .then(data => res.status(200).json({ result: 200, data: data }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ result: 500, error: err.message });
        });
};

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

// const getBookedItemById = (userId, res) => {
//     Models.Booking.findAll({
//         where: {
//             RenterID: userId,
//         },
//         include: [Models.Item],
//     })
//         .then(data => res.send({ result: 200, data: Array.isArray(data) ? data : [data] }))
//         .catch(err => {
//             console.log(err);
//             res.send({ result: 500, error: err.message });
//         });
// };


module.exports = {
    createBooking,
    getBookings,
    getBookedItemById
};