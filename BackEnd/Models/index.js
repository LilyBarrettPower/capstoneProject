'use strict';

const User = require('./users');
const SavedItem = require('./savedItems');
const Item = require('./items');
const Message = require('./messages');

async function init() {
    console.log('starting model syncronization');
    try {
        await User.sync();
        console.log('User model synced');
        await Item.sync();
        console.log('items model synced');
        await SavedItem.sync();
        console.log('Saved items model synced');
        await Message.sync();
        console.log('messaged model synced');
        console.log('all models syncronized');
    } catch (error) {
        console.error('error syncronizing models:', error);
    }
}

init();

module.exports = {
    User,
    SavedItem,
    Item,
    Message
};