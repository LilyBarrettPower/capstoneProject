import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:3307');

const SearchMessages = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchUserID, setSearchUserID] = useState('');
    const [historicalMessages, setHistoricalMessages] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3307/rentshare/messages/getmessages/${searchUserID}`);
            const data = await response.json();

            if (response.ok) {
                setHistoricalMessages(data.data);
                setShowModal(true);
            } else {
                console.error('Error fetching historical messages:', data.error);
            }
        } catch (error) {
            console.error('Error fetching historical messages:', error.message);
        }
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Search Historical Messages</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter UserID"
                        value={searchUserID}
                        onChange={(e) => setSearchUserID(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Historical Messages</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {historicalMessages.map((message) => (
                        <div key={message.MessageID}>
                            <p>Sender: {message.SenderID}</p>
                            <p>Receiver: {message.RecieverID}</p>
                            <p>Content: {message.Content}</p>
                            <hr />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchMessages;