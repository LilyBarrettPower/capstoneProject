const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

const User = require('./users');
const Item = require('./items');

class Booking extends Model { }

Booking.init(
    {
        BookingID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ItemID: {
            type: DataTypes.INTEGER,
            references: { model: Item, key: 'ItemID' },
            allowNull: false,
        },
        RenterID: {
            type: DataTypes.INTEGER,
            references: { model: User, key: 'UserID' },
            allowNull: false,
        },
        OwnerID: {
            type: DataTypes.INTEGER,
            references: { model: User, key: 'UserID' },
            allowNull: false,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // status indicates the amount of days to/from your booking
        Status: {
            type: DataTypes.STRING, 
            allowNull: true, 
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'bookings',
        timestamps: true,
        freezeTableName: true,
    }
);
// create table associations
Booking.belongsTo(Item, { foreignKey: 'ItemID' });
Booking.belongsTo(User, { as: 'Renter', foreignKey: 'RenterID' });
Booking.belongsTo(User, { as: 'Owner', foreignKey: 'OwnerID' });

module.exports = Booking;