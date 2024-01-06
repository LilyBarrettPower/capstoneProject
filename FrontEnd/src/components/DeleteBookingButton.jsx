import Button from 'react-bootstrap/Button';


const DeleteBookingButton = ({ bookingID, onDeleteBooking, userBookedItems, setUserBookedItems }) => {

    const handleDeleteingBooking = () => {
        onDeleteBooking(bookingID);
    }

    return (
        <Button variant='secondary' className='body mx-2' onClick={handleDeleteingBooking} bookedItems={userBookedItems}>
            Delete Booking
        </Button>
    );
};

export default DeleteBookingButton;







