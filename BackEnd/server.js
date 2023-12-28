const express = require('express');
const app = express();

const path = require('path')
const cors = require('cors');

require('dotenv').config();

let dbConnect = require('./dbConnect');


// import routes here:

const itemsRoutes = require('./Routes/itemsRoutes');
const messagesRoutes = require('./Routes/messagesRoutes');
const savedItemsRoutes = require('./Routes/savedItemsRoutes');
const usersRoutes = require('./Routes/usersRoutes');


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

// Use routes here 
// app.use('/rentshare')
app.use('/rentshare/items', itemsRoutes);
app.use('/rentshare/messages', messagesRoutes);
app.use('/rentshare/saveditems', savedItemsRoutes);
app.use('/rentshare/users', usersRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
});

const PORT = process.env.DB_PORT || 3307;
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
