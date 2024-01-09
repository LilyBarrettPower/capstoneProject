// const socketIO = require('socket.io');

// const socketConnection = (server) => {
//     const io = socketIO(server);

//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         // Listen for messages from clients
//         socket.on('message', (data) => {
//             // Broadcast the message to all connected clients - change this so message is only boradcasted to the use intended 
//             io.emit('message', data);
//         });

//         // Handle disconnect event
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });
//     });

//     return io;
// };

// module.exports = socketConnection;

// const socketIO = require('socket.io');

// const socketConnection = (server) => {
//     const io = socketIO(server);

//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         // Listen for messages from clients
//         socket.on('message', (data) => {
//             // Extract sender, receiver, and content from the data
//             const { sender, receiver, content } = data;

//             // find teh socket of teh recipient
//             const recipientSocket = Object.values(io.sockets.sockets).find((s) => s.userName === data.receiver);

//             if (recipientSocket) {
//                 // Emit the message only to the intended recipient
//                 recipientSocket.emit('message', { sender, content });
//             } else {
//                 // Handle the case when the recipient is not found
//                 console.log(`Recipient ${receiver} not found`);
//             }
//         });

//         // Handle disconnect event
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });
//     });

//     return io;
// };

// module.exports = socketConnection;



// const socketConnection = (server) => {
//     const io = socketIO(server);

//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         // Listen for messages from clients
//         socket.on('message', (data) => {
//             // Extract sender, receiver, and content from the data
//             const { sender, receiver, content } = data;

//             // find the socket of the recipient
//             const recipientSocket = Object.values(io.sockets.sockets).find((s) => s.userName === data.receiver);

//             if (recipientSocket) {
//                 // Emit the message only to the intended recipient
//                 recipientSocket.emit('message', { sender, content });
//             } else {
//                 // Handle the case when the recipient is not found
//                 console.log(`Recipient ${receiver} not found`);
//             }
//         });

//         // Handle disconnect event
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });

//         // Add this log to check if the connect event is triggered
//         console.log('A user is connected with socket ID:', socket.id);

//         // Add the following log to check the userName when connecting
//         console.log('User connected with userName:', socket.userName);
//     });

//     return io;
// };

// module.exports = socketConnection;

const socketIO = require('socket.io');
const socketConnection = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        //     console.log('A user connected');

        //     // Variable to store the user name
        //     let userName;

        // Listen for userConnected event
        socket.on('userConnected', (receivedUserName) => {
            // Set up user data when a user connects
            socket.userName = receivedUserName;
            console.log(`User connected with userName: ${socket.userName}`);
        });

        // socket.on('connection', (socket) => {
        console.log('A user connected');

        // Add this log to check if the connect event is triggered
        console.log('A user is connected with socket ID:', socket.id);
        console.log('User connected with userName:', socket.userName);
        

        // Listen for messages from clients
        socket.on('message', (data) => {
            // Extract sender, receiver, and content from the data
            const { sender, receiver, content } = data;

            const connectedUserNames = Object.values(io.sockets.sockets).map(s => s.userName);
            console.log('Connected User Names:', connectedUserNames);

            // find the socket of the recipient
            const recipientSocket = Object.values(io.sockets.sockets).find((s) => s.userName === data.receiver);
            console.log('Recipient Socket:', recipientSocket);
            if (recipientSocket) {
                // Emit the message only to the intended recipient
                recipientSocket.emit('message', { content, sender: socket.userName, receiver });
            } else {
                // Handle the case when the recipient is not found
                console.log(`Recipient ${receiver} not found`);
            }
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
            console.log('User disconnected');
            delete socket.userName;
        });
    });

    return io;
};

module.exports = socketConnection;