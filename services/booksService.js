const getBooksDb = require('./mongoDbService').getBooksDb;
const validator = require('./validatorService');
const objectId = require('mongodb').ObjectId;

const getBook = id => {
    return getBooksDb().findOne(objectId(id));
};

const getBooks = () => {

};

const createBook = book => {
    console.log(validator.validateBook(book));
    return getBooksDb().insert(book);
};

const updateBook = (id, book) => {

};

const deleteBook = id => {

};

module.exports = {
    getBook,
    createBook
};