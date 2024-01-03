
import Button from "react-bootstrap/Button";




// Define the DeleteBookingButton component
const DeleteBookingButton = ({ bookingID, onDeleteBooking }) => {
    // Handle the click event
    const handleDeleteBooking = async () => {
        try {
            // Make API call to delete the booking
            const response = await fetch(`http://localhost:3307/rentshare/bookings/${bookingID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success
                console.log('Booking deleted successfully!');
                // Trigger a callback to update the UI (remove the booking from the list)
                onDeleteBooking(bookingID);
            } else {
                // Handle error
                console.error('Error deleting booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting booking:', error.message);
        }
    };

    return (
        <Button variant='danger' onClick={handleDeleteBooking}>
            Delete Booking
        </Button>
    );
};

// Export the DeleteBookingButton component
export default DeleteBookingButton;