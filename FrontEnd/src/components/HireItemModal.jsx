import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from "../context/userContext";

function HireItemModal({ show, handleClose, itemID, ownerID }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { currentUser } = useUserContext();
    const renterID = currentUser.UserID;

    const handleHire = async () => {
        try {
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
                // Handle success, maybe update the UI or show a success message
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
                <Modal.Title>Hire Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="secondary" onClick={handleHire}>
                    Hire
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default HireItemModal;