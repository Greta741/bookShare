const bcrypt = require('bcrypt-nodejs');
const getUsersDb = require('./mongoDb').getUsersDb;
const objectId = require('mongodb').ObjectId;

const defaultClientId = 'booksClient';

const getUser = email => {
    return getUsersDb().findOne({email: email});
};

const getUserById = id => {
    return getUsersDb().findOne(objectId(id));
};

const createUser = user => {
    return getUsersDb().insert({
        ...user,
        clientId: defaultClientId,
        password: bcrypt.hashSync(user.password),
    });
};

module.exports = {
    getUser,
    getUserById,
    createUser
};