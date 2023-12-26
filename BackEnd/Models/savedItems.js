const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./users');
const Item = require('./items');

class SavedItem extends Model { }

SavedItem.init({
    SavedItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'UserID' },
        allowNull: false,
        required: true,
    },
    ItemID: {
        type: DataTypes.INTEGER,
        references: { model: Item, key: 'ItemID' },
        allowNull: false,
        required: true,
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'saveditems', timestamps: true, freezeTableName: true,
    }
);

module.exports = SavedItem;