'use strict';


const Models = require('../Models');
const { Op } = require('sequelize');
const sequelizeInstance = require('../dbConnect').Sequelize;


const getMessage = (res) => {
    Models.Message.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// testing route to get historical messages with users:
const getMessageByUserId = (UserID, res) => {
    Models.Message.findAll({
        where: {
            [Op.or]: [{ SenderID: UserID }, { RecieverID: UserID }],
            
        },
        order: [['createdAt', 'ASC']],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
};

const getMessagesByUserName = (UserName, res) => {
    Models.Message.findAll({
        where: {
            [Op.or]: [
                { SenderID: { [Op.in]: [sequelizeInstance.literal(`SELECT UserID FROM users WHERE UserName = '${UserName}'`)] } },
                { RecieverID: { [Op.in]: [sequelizeInstance.literal(`SELECT UserID FROM users WHERE UserName = '${UserName}'`)] } },
            ],
        },
        include: [
            {
                model: Models.User,
                as: 'Sender', // Use the alias you specified in the association
                attributes: ['UserName'], // Include only the UserName attribute
            },
        ],
        order: [['createdAt', 'ASC']],
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


const createMessage = (data, res) => {
    console.log('Received data:', data);

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