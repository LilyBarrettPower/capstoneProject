import Button from 'react-bootstrap/Button';


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

export default DeleteBookingButton;







