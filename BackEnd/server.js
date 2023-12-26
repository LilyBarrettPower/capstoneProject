const express = require('express');
const app = express();

require('dotenv').config();

let dbConnect = require('./dbConnect');

// import routes here:
const itemsRoutes = require('./Routes/itemsRoutes');
const messagesRoutes = require('./Routes/messagesRoutes');
const savedItemsRoutes = require('./Routes/savedItemsRoutes');
const usersRoutes = require('./Routes/usersRoutes');


app.use(express.json());

// Use routes here 
// app.use('/rentshare')
app.use('/rentshare/items', itemsRoutes);
app.use('/rentshare/messages', messagesRoutes);
app.use('/rentshare/saveditems', savedItemsRoutes);
app.use('/rentshare/users', usersRoutes);






const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
