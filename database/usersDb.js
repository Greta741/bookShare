const bcrypt = require('bcrypt-nodejs');
const getUsersDb = require('./mongoDb').getUsersDb;
const objectId = require('mongodb').ObjectId;

const getUser = email => {
    return getUsersDb().findOne({email: email});
};

const createUser = user => {
    return getUsersDb().insert({
        ...user,
        password: bcrypt.hashSync(user.password),
    });
};

module.exports = {
    getUser,
    createUser
};