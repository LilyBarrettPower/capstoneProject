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
        require: true,
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'messages', timestamps: true, freezeTableName: true,
    }
);

module.exports = Message;