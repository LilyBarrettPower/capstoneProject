const socketIO = require('socket.io');

const socketConnection = (server) => {
    const io = socketIO(server);

    //     io.on('connection', (socket) => {
    //         socket.on('userConnected', (receivedUserName) => {
    //             // Set up user data when a user connects
    //             socket.userName = receivedUserName;
    //             console.log(`User connected with userName: ${socket.userName}`);

    //             // Emit both UserName and SocketID
    //             io.emit('userConnected', { userName: socket.userName, socketID: socket.id });
    //         });

    //         console.log('A user is connected with socket ID:', socket.id);

    //         // Listen for messages from clients
    //         socket.on('message', (data) => {
    //             const { sender, receiver, content } = data;

    //             setTimeout(() => {
    //                 const connectedUsers = Object.values(io.sockets.sockets).map((s) => ({
    //                     userName: s.userName,
    //                     socketID: s.id,
    //                 }));
    //                 console.log('Connected Users:', connectedUsers);

    //                 const recipientSocket = Object.values(io.sockets.sockets).find((s) => s.id === data.receiver);
    //                 console.log('Recipient Socket:', recipientSocket);

    //                 if (recipientSocket) {
    //                     recipientSocket.emit('message', { content, sender: socket.id, receiver });
    //                 } else {
    //                     console.log(`Recipient ${receiver} not found`);
    //                 }
    //             }, 1000);
    //         });

    //         // Handle disconnect event
    //         socket.on('disconnect', () => {
    //             console.log('User disconnected');
    //             delete socket.userName;
    //         });
    //     });

    //     return io;
    // };

    // module.exports = socketConnection;

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Listen for userConnected event
        socket.on('userConnected', (userName) => {
            console.log(`User connected with userName: ${userName}`);
            // Broadcast to all clients that a new user has connected
            io.emit('chatMessage', `${userName} has joined the chat.`);
        });

        // Listen for messages
        socket.on('chatMessage', (data) => {
            console.log('Received message:', data);
            // Send the message to the user with the specified socket ID
            io.to(data.receiver).emit('chatMessage', data.message);
        });

        // Listen for disconnect event
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

};

    module.exports = socketConnection;