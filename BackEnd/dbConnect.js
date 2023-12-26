'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, dialect: 'mysql'
});

const connectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('mysql connected')
    } catch (error) {
        console.error('unable to connect to mysql', error)
        process.exit(1);
    }
}

connectMySql();

module.exports = {
    Sequelize: sequelize,
    connectMySql
}