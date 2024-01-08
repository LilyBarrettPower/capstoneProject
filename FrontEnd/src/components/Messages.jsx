import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3307'); 

const Messages = () => {
    useEffect(() => {
        // Event listeners and emissions
        const socket = io('http://localhost:3307');

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });
    }, []);

    const sendMessage = () => {
        socket.emit('message', 'Hello, server!');
    };

    return (
        <div>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default Messages;