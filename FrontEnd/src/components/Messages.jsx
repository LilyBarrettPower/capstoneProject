import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUserContext } from '../context/userContext';

const socket = io('http://localhost:3307');

// const Messages = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const { currentUser, selectedUser, handleSelectUser } = useUserContext();


//     const handleSearch = async () => {
//         // Fetch users from your database based on the search query
//         try {
//             const response = await fetch(`http://localhost:3307/rentshare/users/search?query=${searchQuery}`);
//             const data = await response.json();
//             setSearchResults(data); // Assuming the response is an array of user objects
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleSelectResult = (user) => {
//         handleSelectUser({
//             UserName: user.UserName,
//             SocketID: user.SocketID,
//         });
//         setSearchResults([]);
//         setSearchQuery('');
//     };

//     useEffect(() => {
//         // Event listeners and emissions

//         // Set socket.userName to the UserName of the currently logged-in user
//         // if (currentUser && currentUser.UserName) {
//         //     // socket.userName = currentUser.UserName;
//         //     socket.emit('userConnected', currentUser.UserName);
//         // }

//         console.log('The current username of the current user: ', currentUser.UserName)

//         socket.on('connect', () => {
//             console.log('Connected to Socket.io server userName:', socket.userName);
//             console.log('connected to socket server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from Socket.io server');
//         });

//         socket.on('message', (data) => {
//             console.log('recieved message', data) //THIS CONSOLE.LOG ISNT SHOWING UP!
//             // Update the messages state with the received message
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             // Cleanup, disconnect, or remove event listeners if needed
//         };
//     }, [currentUser, selectedUser, messages]);

//     const sendMessage = () => {
//         // Check if there is a selected user
//         if (!selectedUser) {
//             console.log('No user selected to send a message to.');
//             return;
//         }

//         console.log("selected user: ", selectedUser);
//         console.log('current user: ', currentUser);

//         // Emit the message to the server with the recipient's UserName
//         socket.emit('message', {
//             sender: socket.id,
//             receiver: selectedUser.SocketID,
//             content: message,
//         });

//         console.log('Message sent:', {
//             sender: currentUser.UserName,
//             receiver: selectedUser.UserName,
//             content: message,
//         });

//         // Clear the input box after sending the message
//         setMessage('');
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <div>
//                 {/* Search bar for users */}
//                 <input
//                     type="text"
//                     placeholder="Search for users"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//                 {/* Display search results */}
//                 <ul>
//                     {searchResults.map((user) => (
//                         <li key={user.UserID} onClick={() => handleSelectResult(user)}>
//                             {user.UserName}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//                 {/* Display the messages */}
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg.content}</div>
//                 ))}
//             </div>
//             <div style={{ display: 'flex' }}>
//                 {/* Input box for composing messages */}
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     style={{ flex: 1, marginRight: '10px', padding: '5px' }}
//                 />
//                 {/* Send button */}
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
    // };
    
const Messages = () => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [socketId, setSocketId] = useState('');

    useEffect(() => {
        // Prompt user for username
        const user = prompt('Enter your username:');
        setUserName(user);

        // Emit userConnected event
        socket.emit('userConnected', user);

        setSocketId(socket.id);

        // Listen for chatMessage event
        socket.on('chatMessage', (data) => {
            setReceivedMessage(data);
        });

        return () => {
            // Cleanup event listeners if component unmounts
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Replace 'receiverSocketId' with the socket ID of the user you want to send the message to
        const receiverSocketId = prompt('Enter the receiver\'s socket ID:');
        socket.emit('chatMessage', { receiver: receiverSocketId, message });
    };

    return (
        <div>
            <h2>{userName}'s Chat </h2>
            <p>SosketID: {socketId}</p>
            <div>
                <strong>Received Message:</strong> {receivedMessage}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default Messages;