const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model { }

User.init({
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Contact: {
        type: DataTypes.STRING,
    },
    Location: {
        type: DataTypes.STRING,
    },
    // ProfilePhoto: {
    //     type: DataTypes.STRING,
    // },
},
    {
        sequelize: sequelizeInstance, modelName: 'users', timestamps: true, freezeTableName: true,
    }
); 




module.exports = User;