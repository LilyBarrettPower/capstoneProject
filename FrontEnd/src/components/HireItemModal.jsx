import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from "../context/userContext";

function HireItemModal({ show, handleClose, itemID, ownerID }) {
    // state to store the dates:
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookedDates, setBookedDates] = useState([]);
// get the current user from the context
    const { currentUser } = useUserContext();
    const renterID = currentUser.UserID;

    useEffect(() => {
        // Fetch booked dates for the selected item
        const fetchBookedDates = async () => {
            try {
                const response = await fetch(`http://localhost:3307/rentshare/bookings/getbookedbyitem/${itemID}}`);
                if (response.ok) {
                    const data = await response.json();
                    // Map fetched data to start and end date objects
                    const dates = data.data.map(booking => ({
                        start: new Date(booking.StartDate),
                        end: new Date(booking.EndDate),
                    }));
                    // update state with booked dates:
                    setBookedDates(dates);
                } else {
                    console.error('Error fetching booked dates:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching booked dates:', error.message);
            }
        };

        fetchBookedDates();
    }, [itemID]);

    const isDateBooked = (startDate, endDate) => {
        // Check if any part of the selected range overlaps with existing bookings
        return bookedDates.some(booking => (
            (new Date(startDate) >= booking.start && new Date(startDate) <= booking.end) ||
            (new Date(endDate) >= booking.start && new Date(endDate) <= booking.end) ||
            (new Date(startDate) <= booking.start && new Date(endDate) >= booking.end)
        ));
    };
  

    const handleHire = async () => {
        try {
            // Check if any part of the selected range is already booked
            if (isDateBooked(startDate, endDate)) {
                console.error('Error creating booking: Selected dates are already booked.');
                alert('These dates are already booked')
                return;
            }
            // send a request to create a new booking in the DB
            const response = await fetch('http://localhost:3307/rentshare/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ItemID: itemID,
                    RenterID: renterID,
                    OwnerID: ownerID,
                    StartDate: startDate,
                    EndDate: endDate,
                }),
            });

            if (response.ok) {
                // Handle success,  show a success message
                console.log('Booking created successfully!');
                handleClose(); // Close the modal after successful booking
            } else {
                // Handle error
                console.error('Error creating booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating booking:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="headings">Hire Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="startDate">
                        <Form.Label className='body'>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            className='body'
                            // onChange={(e) => setStartDate(e.target.value)}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                            max={endDate || undefined} // Set maximum date to end date if available
                            disabledDates={bookedDates.map(booking => booking.start.toISOString().split('T')[0])} // Disable booked dates
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label className='body'>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            className='body'
                            // onChange={(e) => setEndDate(e.target.value)}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || new Date().toISOString().split('T')[0]} // Set minimum date to start date if available, else today
                            disabledDates={bookedDates.map(booking => booking.start.toISOString().split('T')[0])} // Disable booked dates
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='body' onClick={handleClose}>
                    Close
                </Button>
                <Button variant="secondary" className='body' onClick={handleHire}>
                    Hire
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default HireItemModal;