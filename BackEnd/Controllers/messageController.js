'use strict';


const Models = require('../Models');
const { Op } = require('sequelize');
const sequelizeInstance = require('../dbConnect').Sequelize;

// generic controller to get all messages used in testing
const getMessage = (res) => {
    Models.Message.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// route to get historical messages with users based on UserID:
const getMessageByUserId = (UserID, res) => {
    Models.Message.findAll({
        // find messages where the SenderID or the RecieverID match the UserID in the search 
        where: {
            [Op.or]: [{ SenderID: UserID }, { RecieverID: UserID }],
            
        },
        // order the results by the timestamp in ascending order:
        order: [['createdAt', 'ASC']],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
};

// controller to get historical messages based on UserName
const getMessagesByUserName = (UserName, res) => {
    Models.Message.findAll({
        // find messages where the SenderID or the Reciever ID match the UserID accosiated with the UserName searched
        where: {
            [Op.or]: [
                { SenderID: { [Op.in]: [sequelizeInstance.literal(`SELECT UserID FROM users WHERE UserName = '${UserName}'`)] } },
                { RecieverID: { [Op.in]: [sequelizeInstance.literal(`SELECT UserID FROM users WHERE UserName = '${UserName}'`)] } },
            ],
        },
        // include the sender accosiation to fetch the senders username for the front end to display 
        include: [
            {
                model: Models.User,
                as: 'Sender', // Use the alias you specified in the association
                attributes: ['UserName'], // Include only the UserName attribute
            },
        ],
        // order the results by createdAT date in ascending order
        order: [['createdAt', 'ASC']],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


// controller to create a message, when message sent in front end it creates the message in the DB
const createMessage = (data, res) => {
    console.log('Received data:', data); // testing

    Models.Message.create({
        SenderID: data.senderID,
        RecieverID: data.receiverID,
        Content: data.content,
    })
        .then(data => {
            console.log('Message stored successfully:', data);
            res.send({ result: 200, data: data });
        })
        .catch(err => {
            console.error('Error storing message:', err);
            res.send({ result: 500, error: err.message });
        });
};

// generic controller to update message - testing:
const updateMessage = (req, res) => {
    Models.Message.update(req.body, {
        where: { MessageID: req.params.MessageID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

// generic controller to delete messages used in testing:
const deleteMessage = (req, res) => {
    Models.Message.destroy({
        where: { MessageID: req.params.MessageID }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage,
    getMessageByUserId,
    getMessagesByUserName

}