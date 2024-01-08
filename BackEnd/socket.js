const socketIO = require('socket.io');

const socketConnection = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle socket events here

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

module.exports = socketConnection;