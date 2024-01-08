const express = require('express');
const app = express();

const http = require('http');


const path = require('path')
const cors = require('cors');

require('dotenv').config();

let dbConnect = require('./dbConnect');


const socketConnection = require('./socket');
const server = http.createServer(app);
const io = socketConnection(server);

// import routes here:

const itemsRoutes = require('./Routes/itemsRoutes');
const messagesRoutes = require('./Routes/messagesRoutes');
const savedItemsRoutes = require('./Routes/savedItemsRoutes');
const usersRoutes = require('./Routes/usersRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');


const corsOptions = {
    origin: 'http://localhost:3307', // Update with your front end's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};


app.use(express.json());
app.use(cors(corsOptions));

// Serve the front end through the server 
app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

// serve the profile pictures:
const uploadDirectory = path.join(__dirname, 'Routes', 'uploads');
app.use('/uploads', express.static(uploadDirectory));

// Use routes here 
// app.use('/rentshare')
app.use('/rentshare/items', itemsRoutes);
app.use('/rentshare/messages', messagesRoutes);
app.use('/rentshare/saveditems', savedItemsRoutes);
app.use('/rentshare/users', usersRoutes);
app.use('/rentshare/bookings', bookingRoutes)



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
});

const PORT = process.env.DB_PORT || 3307;
server.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
