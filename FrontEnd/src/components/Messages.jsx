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

import SearchMessages from './SearchMessages';

    
const Messages = () => {
    // get the current userfrom the context:
    const currentUser = useUserContext();
    // state for the messages
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    // state for the socket ID
    const [socketId, setSocketId] = useState('');

    // states for the searching of users:
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    // start a socket instance:
    const socket = io('http://localhost:3307');

    useEffect(() => {
        // flag for if the component is mounted or not 
        let isMounted = true;
        if (currentUser && currentUser.currentUser.UserName) {
            // Emit userConnected event with the username from the user context
            socket.emit('userConnected', currentUser.currentUser.UserName);

            // Listen for chatMessage event
            socket.on('chatMessage', (data) => {
                if (isMounted) {
                    // if the component is mounted, set the recieved messages state to the data 
                    setReceivedMessages((prevMessages) => [...prevMessages, data]);
                }
            });
            // set the socketID to the current socket.id
            setSocketId(socket.id);

            return () => {
                // Cleanup event listeners if component unmounts
                socket.disconnect();
                isMounted = false;
            };
        }
    }, [currentUser]);

    const sendMessage = async () => {
        if (!selectedReceiver) {
            console.log('No selected user');
            alert('You must select a user to send a message to')
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
                // update the state with the new message 
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
            // search the database for users with a username that was inputted
            const response = await fetch(`http://localhost:3307/rentshare/users/search?query=${searchQuery}`);
            const data = await response.json();
            // set the search results to the returned data
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSelectReceiver = (user) => {
        setSelectedReceiver(user); // set the selected reciever to the user searched
        setSearchResults([]); // Clear search results
        setSearchQuery(''); // clear the search 
    };

    console.log('Received Messages client side:', receivedMessages); // testing



    // Function to format messages with different styles for sender and receiver
    const formatMessages = () => {
        return receivedMessages.map((item, index) => {
            console.log('Received Message:', item);
            return (
                // if the senders username is the same as the current user then style this as a sender-message
                <div key={index} className={item.sender === currentUser.currentUser.UserName ? 'sender-message' : 'receiver-message'}> 
                    {typeof item === 'object' ? ( // check if the item is returned as an object 
                        <>
                            <p className='headings'>{item.sender === currentUser.currentUser.UserName ? 'You' : item.sender}:</p>
                            <p className='body'>{item.message}</p>
                        </>
                    ) : ( // if not, render the item alone 
                        <p className='body'>{item}</p>
                    )}
                </div>
            );
        });
    };


        return (
            <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                <h2 className='headings italic my-2 mx-5'>{currentUser.currentUser.UserName}'s Chat </h2>
                <Row>
                    <Col md={4}>
                        <div className="d-flex align-items-end mt-2" style={{marginLeft: '10px'}}>
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
                        <SearchMessages></SearchMessages>
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
                        <div className="d-flex align-items-end position-fixed bottom-0 p-3 body" style={{width: '900px'}}>
                        <Form.Control
                            type="text"
                                value={message}
                                placeholder='Type your message...'
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