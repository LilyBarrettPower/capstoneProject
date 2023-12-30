const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./users');

class Item extends Model { }

Item.init({
    ItemID: {
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
    ItemCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ItemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ItemDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ItemPricePerDay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ItemFeaturedDescription: {
        type: DataTypes.STRING,
    },
    // Availability: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: true,
    // },
    ItemLocation: {
        type: DataTypes.STRING,
    },
    ItemFeaturedPhoto: {
        type: DataTypes.STRING,
    },
    ItemOtherPhotos: {
        type: DataTypes.JSON,
    },
},
    {
        sequelize: sequelizeInstance, modelName: 'items', timestamps: true, freezeTableName: true,
    }
);




module.exports = Item;