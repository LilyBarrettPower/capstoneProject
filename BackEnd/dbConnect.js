'use strict';

const { Sequelize } = require('sequelize');

// create a new sintance of sequelize 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, dialect: 'mysql'
});

// function to connect to the mysql database:
const connectMySql = async () => {
    try {
        // authenticate connection
        await sequelize.authenticate();
        console.log('mysql connected')
    } catch (error) {
        console.error('unable to connect to mysql', error)
        process.exit(1);
    }
}

// establish the database connection
connectMySql();

module.exports = {
    Sequelize: sequelize,
    connectMySql
}