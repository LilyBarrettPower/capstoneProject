// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3307');

// const Messages = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Event listeners and emissions

//         socket.on('connect', () => {
//             console.log('Connected to Socket.io server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from Socket.io server');
//         });

//         socket.on('message', (data) => {
//             // Update the messages state with the received message
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             // Cleanup, disconnect, or remove event listeners if needed
//         };
//     }, []);

//     const sendMessage = () => {
//         // Emit the message to the server
//         socket.emit('message', message);

//         // Clear the input box after sending the message
//         setMessage('');
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//                 {/* Display the messages */}
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg}</div>
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

// export default Messages;


// useEffect(() => {
//     // Event listeners and emissions

//     socket.on('connect', () => {

//         // Check if selectedUser is not null before setting socket.userName
//         if (selectedUser && selectedUser.UserName) {
//             socket.userName = selectedUser.UserName;
//         }
//         console.log('Connected to Socket.io server userName:', socket.userName );
//     });

//     socket.on('disconnect', () => {
//         console.log('Disconnected from Socket.io server');
//     });

//     socket.on('message', (data) => {
//         // Update the messages state with the received message
//         setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//         // Cleanup, disconnect, or remove event listeners if needed
//     };
// }, [selectedUser?.UserName]);

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUserContext } from '../context/userContext';

const socket = io('http://localhost:3307');

const Messages = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { currentUser, selectedUser, handleSelectUser } = useUserContext();


    const handleSearch = async () => {
        // Fetch users from your database based on the search query
        try {
            const response = await fetch(`http://localhost:3307/rentshare/users/search?query=${searchQuery}`);
            const data = await response.json();
            setSearchResults(data); // Assuming the response is an array of user objects
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSelectResult = (user) => {
        handleSelectUser(user);
        setSearchResults([]);
        setSearchQuery('');
    };

    useEffect(() => {
        // Event listeners and emissions

        // Set socket.userName to the UserName of the currently logged-in user
        if (currentUser && currentUser.UserName) {
            // socket.userName = currentUser.UserName;
            socket.emit('userConnected', currentUser.UserName);
        }

        console.log('The current username of the current user: ', currentUser.UserName)

        socket.on('connect', () => {
            console.log('Connected to Socket.io server userName:');
            console.log('connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        socket.on('message', (data) => {
            console.log('recieved message', data) //THIS CONSOLE.LOG ISNT SHOWING UP!
            // Update the messages state with the received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            // Cleanup, disconnect, or remove event listeners if needed
        };
    }, [currentUser]);

    const sendMessage = () => {
        // Check if there is a selected user
        if (!selectedUser) {
            console.log('No user selected to send a message to.');
            return;
        }

        console.log("selected user: ", selectedUser);
        console.log('current user: ', currentUser);

        // Emit the message to the server with the recipient's UserName
        socket.emit('message', {
            sender: currentUser.UserName,
            receiver: selectedUser.UserName,
            content: message,
        });

        console.log('Message sent:', {
            sender: currentUser.UserName,
            receiver: selectedUser.UserName,
            content: message,
        });

        // Clear the input box after sending the message
        setMessage('');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <div>
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
                        <li key={user.UserID} onClick={() => handleSelectResult(user)}>
                            {user.UserName}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {/* Display the messages */}
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div style={{ display: 'flex' }}>
                {/* Input box for composing messages */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', padding: '5px' }}
                />
                {/* Send button */}
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Messages;