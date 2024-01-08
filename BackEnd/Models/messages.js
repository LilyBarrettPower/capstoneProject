const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./users');

class Message extends Model { }

Message.init({
    MessageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    SenderID: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'UserID' },
        allowNull: false,
        required: true,
    },
    RecieverID: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'UserID' },
        allowNull: false,
        required: true,
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'messages', timestamps: true, freezeTableName: true,
    }
);


// Define association with User model
Message.belongsTo(User, { foreignKey: 'SenderID', as: 'Sender' });
Message.belongsTo(User, { foreignKey: 'RecieverID', as: 'Reciever' });

module.exports = Message;