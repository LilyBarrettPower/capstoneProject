import Button from 'react-bootstrap/Button';
import { useState } from 'react';

// Define the DeleteBookingButton component
const DeleteBookingButton = ({ bookingID, onDeleteBooking, userBookedItems, setUserBookedItems }) => {

    const handleDeleteingBooking = () => {
        onDeleteBooking(bookingID);
    }

    return (
        <Button variant='danger' onClick={handleDeleteingBooking} bookedItems={userBookedItems}>
            Delete Booking
        </Button>
    );
};

// Export the DeleteBookingButton component
export default DeleteBookingButton;



    // const [userBookedItems, setUserBookedItems] = useState([]);

    // // Handle the click event
    // const handleDeleteBooking = async (bookingID) => {
    //     try {
    //         // Make API call to delete the booking
    //         const response = await fetch(`http://localhost:3307/rentshare/bookings/${bookingID}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             // Handle success
    //             console.log('Booking deleted successfully!');
    //             alert('Booking removed')
    //             // Trigger the callback to update the UI (remove the booking from the list)
    //             // onDeleteBooking(bookingID);
    //             setUserBookedItems((prevBookedItems) => prevBookedItems.filter((item) => item.BookingID !== bookingID));
    //         } else {
    //             // Handle error
    //             console.error('Error deleting booking:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting booking:', error.message);
    //     }
    // };

    // testing:




