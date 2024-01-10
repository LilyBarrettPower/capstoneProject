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

    // const sendMessage = () => {
    //     // Replace 'receiverSocketId' with the socket ID of the user you want to send the message to
    //     const receiverSocketId = prompt('Enter the receiver\'s socket ID:');
    //     socket.emit('chatMessage', { receiver: receiverSocketId, message });
    // };

    const sendMessage = () => {
        const receiverUserName = prompt('Enter the receiver\'s username:');
        socket.emit('chatMessage', { receiver: receiverUserName, message });
    };
    

    console.log('Received Messages:', receivedMessages);

    return (
        <div>
            <h2>{currentUser.currentUser.UserName}'s Chat </h2>
            <p>SocketID: {socketId}</p>
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