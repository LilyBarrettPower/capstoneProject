import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUserContext } from '../context/userContext';

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

    const sendMessage = () => {
        if (!selectedReceiver) {
            console.log('No selected user');
            return;
        }
        // const receiverUserName = prompt('Enter the receiver\'s username:');
        socket.emit('chatMessage', { receiver: selectedReceiver.UserName, message });
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

    return (
        <div>
            <h2>{currentUser.currentUser.UserName}'s Chat </h2>
            <p>SocketID: {socketId}</p>

            {/* Search bar for users */}
            <input
                type="text"
                placeholder="Search for users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Display search results */}
            <ul>
                {searchResults.map((user) => (
                    <li key={user.UserID} onClick={() => handleSelectReceiver(user)}>
                        {user.UserName}
                    </li>
                ))}
            </ul>
            {/* Display selected receiver message */}
            {selectedReceiver && (
                <p>Messaging {selectedReceiver.UserName}</p>
            )}





            <div>
                <strong>Received Messages:</strong>
                {receivedMessages.map((item, index) => (
                    <div key={index}>
                        {typeof item === 'object' ? (
                            <>
                                <p>Sender: {item.sender}</p>
                                <p>Message: {item.message}</p>
                            </>
                        ) : (
                            <p>{item}</p>
                        )}
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default Messages;