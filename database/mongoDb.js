const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://user:politicats@ds135574.mlab.com:35574/bookshare?maxPoolSize=10';

let collections = {};

const mongoConnect = () => {
    MongoClient.connect(url).then((db) => {
        collections = {
            booksCollection: db.collection('booksCollection'),
            usersCollection: db.collection('usersCollection'),
        };
    }).catch((err) => console.error(err));
};

const getBooksDb = () => {
    return collections.booksCollection;
}

const getUsersDb = () => {
    return collections.usersCollection;
}

module.exports = {
    mongoConnect,
    getBooksDb,
    getUsersDb
};