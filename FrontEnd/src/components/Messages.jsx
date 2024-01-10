import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUserContext } from '../context/userContext';


// import bootstrap stuff:
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styling/Messages.css';

const socket = io('http://localhost:3307');
    
const Messages = () => {
    // const [userName, setUserName] = useState('');
    // get the users username from the context:
    const currentUser = useUserContext();
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [socketId, setSocketId] = useState('');

    // states for the searching of users:
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    

    useEffect(() => {
        if (currentUser && currentUser.currentUser.UserName) {
            // Emit userConnected event with the username from the user context
            socket.emit('userConnected', currentUser.currentUser.UserName);

            // Listen for chatMessage event
            socket.on('chatMessage', (data) => {
                setReceivedMessages((prevMessages) => [...prevMessages, data]);
            });

            setSocketId(socket.id);

            return () => {
                // Cleanup event listeners if component unmounts
                socket.disconnect();
            };
        }
    }, [currentUser]);

    const sendMessage = async () => {
        if (!selectedReceiver) {
            console.log('No selected user');
            return;
        }

        try {
            // Store the message in the database using fetch
            const response = await fetch('http://localhost:3307/rentshare/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderID: currentUser.currentUser.UserID,
                    receiverID: selectedReceiver.UserID,
                    content: message,
                    senderUsername: currentUser.currentUser.UserName,
                }),
            });

            const result = await response.json();
            console.log('API Response:', result);
            
            if (response.ok) {
                console.log('Message stored in the database successfully!');
                // Optionally, you can update the local state with the new message if needed.
                setReceivedMessages((prevMessages) => [...prevMessages, { sender: currentUser.currentUser.UserName, message }]);
            } else {
                console.error('Error storing message in the database:', result.error);
            }

            // Emit the message to other users through the socket
            socket.emit('chatMessage', {
                receiver: selectedReceiver.UserName,
                message,
                receiverID: selectedReceiver.UserID,
                senderUsername: currentUser.currentUser.UserName,
            });
        } catch (error) {
            console.error('Error sending message:', error.message);
        }

        setMessage('');
    };

    
    // adding search functionality:
    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3307/rentshare/users/search?query=${searchQuery}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSelectReceiver = (user) => {
        setSelectedReceiver(user);
        setSearchResults([]); // Clear search results
        setSearchQuery('');
    };

    console.log('Received Messages:', receivedMessages);


// testing:
    // Function to format messages with different styles for sender and receiver
    const formatMessages = () => {
        return receivedMessages.map((item, index) => (
            <div key={index} className={item.sender === currentUser.currentUser.UserName ? 'sender-message' : 'receiver-message'}>
                {typeof item === 'object' ? (
                    <>
                        <p className='headings'>{item.sender === currentUser.currentUser.UserName ? 'You' : item.sender}:</p>
                        <p className='body'>{item.message}</p>
                    </>
                ) : (
                    <p className='body'>{item}</p>
                )}
            </div>
        ));
    };


        return (
            <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                <h2 className='headings'>{currentUser.currentUser.UserName}'s Chat </h2>
                <Row>
                        <p>SocketID: {socketId}</p>
                    <Col md={4}>
                        <div className="d-flex align-items-end mt-2">
                        {/* Search bar for users */}
                            <Form.Control
                                type="text"
                                placeholder="Search for users"
                                className='body'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                    
                            <Button variant='secondary' className='body mx-2' onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                        {/* Display search results */}
                        <ListGroup>
                            {searchResults.map((user) => (
                                <ListGroup.Item key={user.UserID}
                                    action
                                    className='body'
                                    onClick={() => handleSelectReceiver(user)}>
                                    {user.UserName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    </Col>
                    <Col md={8}>
                        <div>
                            {/* Display selected receiver message */}
                            {selectedReceiver && (
                                <strong className='headings text-center'>Messaging: {selectedReceiver.UserName}</strong>
                            )}
                            <div className='message-container'>
                            {/* Display formatted messages */}
                                {formatMessages()}
                            </div>
                        </div>
                        <div className="d-flex align-items-end position-fixed bottom-0 p-3" style={{width: '900px'}}>
                        <Form.Control
                            type="text"
                                value={message}
                                className='body'
                            onChange={(e) => setMessage(e.target.value)}
                        />
                            <Button variant='secondary' className='body mt-2 mx-2' onClick={sendMessage}>Send</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    };
    


export default Messages;