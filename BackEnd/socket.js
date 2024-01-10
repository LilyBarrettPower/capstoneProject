const socketIO = require('socket.io');

// create a users variable to keep track of username and associated socketID
const users = {};

const socketConnection = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Listen for userConnected event
        socket.on('userConnected', (userName) => {
            console.log(`User connected with userName: ${userName}`);
            // Broadcast to all clients that a new user has connected

            // added sender here:
            io.emit('chatMessage', { sender: 'System', message: `${userName} has joined the chat.` });

            // store the users socketID with that users username:
            users[userName] = socket.id;
        });

        // Listen for messages
        socket.on('chatMessage', (data, userName) => {
            console.log('Received message:', data);

            const senderUserName = Object.keys(users).find((key) => users[key] === socket.id);
            const receiverSocketId = users[data.receiver];
            if (receiverSocketId) {
                // Send the message to the user with the specified socket ID
                io.to(receiverSocketId).emit('chatMessage', {sender: senderUserName, message: data.message});
            } else {
                console.log(`Reciever ${data.receiver} not found`)
            }
        });


        // Listen for disconnect event
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            
            // remove the user from users when disconnected:
            const userName = Object.keys(users).find((key) => users[key] === socket.id);
            if (userName) {
                delete users[userName];
                io.emit('chatMessage', { sender: 'System', message: `${userName} has left the chat.` });
            }
        });
    });

};

    module.exports = socketConnection;