import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';

import { format } from 'date-fns';

import { useUserContext } from '../context/userContext';

import '../styling/SearchMessages.css'

const socket = io('http://localhost:3307');

const SearchMessages = () => {
    // state for the modal
    const [showModal, setShowModal] = useState(false);
    // state for the search username
    const [searchUserName, setSearchUserName] = useState('');
    // state for historical messages
    const [historicalMessages, setHistoricalMessages] = useState([]);
    // get the current user from the context
    const currentUser = useUserContext();

    const handleSearch = async () => {
        try {
            // search the database for messages based on the inputted username
            const response = await fetch(`http://localhost:3307/rentshare/messages/byusername/${searchUserName}`);
            const data = await response.json();

            if (response.ok) {
                // set the historical messages to the messages returned by the fetch
                setHistoricalMessages(data.data);
                setShowModal(true);
                console.log('Historical Messages:', data.data);
                // console.log('response', response);
            }  else {
                console.error('Error fetching historical messages:', data.error);
                }  
        } catch (error) {
            console.error('Error fetching historical messages:', error.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={12} style={{marginTop: '200px'}}>
                    <h2 className='headings italic my-2 mx-4'>Search Historical Messages</h2>
                    <div className="d-flex align-items-end mt-2">
                            <Form.Control
                                type="text"
                            placeholder="Enter User Name"
                            className='body'
                                value={searchUserName}
                                onChange={(e) => setSearchUserName(e.target.value)}
                            />
                        <Button variant='secondary' className='body mx-2' onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={10}>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title className='headings'>Historical Messages</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* check if there are historical messages with that user, map over the messages and style based on the ID of the sender */}
                           {historicalMessages.length === 0 ? (
                                <p className='body'>No historical messages</p>
                            ) : (
                                historicalMessages.map((message) => (
                                    <div
                                        key={message.MessageID}
                                        className={`message-container ${message.SenderID === currentUser.currentUser.UserID ? 'current-user-message' : 'other-user-message'}`}
                                    >
                                        <div className="date-content-container">
                                            <p className='headings'><strong>Sender: {message.Sender.UserName}</strong></p>
                                            <p className='body date'>{format(new Date(message.createdAt), 'do MMM yyyy')}</p>
                                        </div>
                                        <p className='body'>Content: {message.Content}</p>
                                    </div>
                                ))
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchMessages;