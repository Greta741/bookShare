const getBooksDb = require('./mongoDb').getBooksDb;
const objectId = require('mongodb').ObjectId;

const getBooks = () => {
    return getBooksDb().find().sort({ dateUpdated: -1 }).toArray();
};

const getBook = id => {
    return getBooksDb().findOne(objectId(id));
};

const createBook = (book, user) => {
    book.dateUpdated = new Date();
    book.userId = new objectId(user._id);
    book.email = user.email;
    book.phone = user.phone
    return getBooksDb().insert(book);
};

const updateBook = (id, book, user) => {
    book.dateUpdated = new Date();
    book.userId = new objectId(user._id);
    book.email = user.email;
    book.phone = user.phone;
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
    getBook,
    createBook,
    updateBook,
    deleteBook
};