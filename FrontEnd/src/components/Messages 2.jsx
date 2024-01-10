import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3307'); 

const Messages = () => {
    useEffect(() => {
        // Event listeners and emissions

        socket.on('message', (data) => {
            console.log('Received message:', data);
        });

        return () => {
            // Cleanup, disconnect, or remove event listeners if needed
        };
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