const socketIO = require('socket.io');

// create a users object to keep track of username and associated socketID
const users = {};

const socketConnection = (server) => {
    // create a new instance of socket.io
    const io = socketIO(server);

    // listen for the connection event
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Listen for userConnected event when a user connects with a username
        socket.on('userConnected', (userName) => {
            console.log(`User connected with userName: ${userName}`);
            // Broadcast to all clients that a new user has connected
            io.emit('chatMessage', {
                sender: 'System',
                message: `${userName} has joined the chat.`,
            });

            // store the users socketID with that users username:
            users[userName] = socket.id;
        });

        // Listen for messages via the chatMessage event
        socket.on('chatMessage', (data, userName) => {
            console.log('Sent message:', data);
            // extract the senders username from the message data
            const senderUserName = data.senderUsername;
            console.log('sender username:', senderUserName)
            // get the socketid of the reciever 
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
                // broadcast to all clients that a user has left that chat
                io.emit('chatMessage', { sender: 'System', message: `${userName} has left the chat.` });
            }
        });
    });

};

    module.exports = socketConnection;