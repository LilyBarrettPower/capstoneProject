'use strict';

const Models = require('../Models');

const getMessage = (res) => {
    Models.Message.findAll({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// const createMessage = (data, res) => {
//     Models.Message.create(data)
//         .then(data => res.send({ result: 200, data: data }))
//         .catch(err => {
//             console.log(err);
//             res.send({ result: 500, error: err.message });
//         });
// }

// testing:

const createMessage = (data, res) => {
    // Corrected spelling for RecieverID
    Models.Message.create({
        SenderID: data.senderID,
        RecieverID: data.receiverID,
        Content: data.message,
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
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
    deleteMessage
}