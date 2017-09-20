const getBooksDb = require('./mongoDbService').getBooksDb;
const objectId = require('mongodb').ObjectId;

const getBooks = () => {
    return getBooksDb().find().sort({ dateUpdated: -1 }).toArray();
};

const getBooksByParams = params => {
    const query = {};
    if (params.type) {
        query.types = params.type;
    }
    if (params.city) {
        query.city = params.city;
    }
    return getBooksDb().find(query).sort({ dateUpdated: -1 }).toArray();
};

const getBook = id => {
    return getBooksDb().findOne(objectId(id));
};

const createBook = book => {
    book.dateUpdated = new Date();
    return getBooksDb().insert(book);
};

const updateBook = (id, book) => {
    book.dateUpdated = new Date();
    return getBooksDb().updateOne(
        { _id: objectId(id)},
        book
    );
};

const deleteBook = id => {
    return getBooksDb().remove(
        { _id: objectId(id) }
    );
};

module.exports = {
    getBooks,
    getBooksByParams,
    getBook,
    createBook,
    updateBook,
    deleteBook
};