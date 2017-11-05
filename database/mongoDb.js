const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://user:politicats@ds135574.mlab.com:35574/bookshare?maxPoolSize=10';

let collections = {};

const mongoConnect = () => {
    MongoClient.connect(url).then((db) => {
        collections = {
            booksCollection: db.collection('booksCollection'),
            usersCollection: db.collection('usersCollection'),
            clientsCollection: db.collection('clientsCollection'),
            codesCollection: db.collection('codesCollection'),
            tokensCollection: db.collection('tokensCollection'),
        };
    }).catch((err) => console.error(err));
};

const getBooksDb = () => {
    return collections.booksCollection;
}

const getUsersDb = () => {
    return collections.usersCollection;
}

const getClientsDb = () => {
    return collections.clientsCollection;
}

const getCodesDb = () => {
    return collections.codesCollection;
}

const getTokensDb = () => {
    return collections.tokensCollection;
}

module.exports = {
    mongoConnect,
    getBooksDb,
    getUsersDb,
    getClientsDb,
    getCodesDb,
    getTokensDb
};