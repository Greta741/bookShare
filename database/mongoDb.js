const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://user:politicats@ds135574.mlab.com:35574/bookshare?maxPoolSize=10';

let collections = {};

const mongoConnect = () => {
    MongoClient.connect(url).then((db) => {
        collections = {
            booksCollection: db.collection('booksCollection'),
        };
    }).catch((err) => console.error(err));
};

const getBooksDb = () => {
    return collections.booksCollection;
}

module.exports = {
    mongoConnect,
    getBooksDb
};