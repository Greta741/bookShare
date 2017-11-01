const bcrypt = require('bcrypt-nodejs');
const getClientsDb = require('./mongoDb').getClientsDb;
const getTokensDb = require('./mongoDb').getTokensDb;
const getCodesDb = require('./mongoDb').getCodesDb;
const objectId = require('mongodb').ObjectId;

const getClient = id => {
    return getClientsDb().findOne({ id: id });
};

const getToken = token => {
    return getTokensDb().findOne({ token: token });
};

const getCode = code => {
    return getCodesDb().findOne({ value: code });
};

const createCode = code => {
    return getCodesDb().insert(code);
};

const createToken = token => {
    return getTokensDb().insert(token);
};

module.exports = {
    getClient,
    getToken,
    getCode,
    createCode,
    createToken,
};