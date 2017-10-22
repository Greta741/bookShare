const Joi = require('joi');
const { types, cities } = require('./constants');
Joi.objectId = require('joi-objectid')(Joi);

const today = new Date();

const bookSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    author: Joi.string().min(3).max(30).required(),
    year: Joi.number().integer().min(1900).max(today.getFullYear()),
    type: Joi.string().valid(types).required(),
    city: Joi.string().valid(cities),
    pages: Joi.number().integer().min(0).max(10000).required(),
    tradable: Joi.boolean().required(),
    forSell: Joi.boolean().required(),
    price: Joi.number().min(0).max(10000),
}).with('forSell', 'price');

const bookIdSchema = Joi.objectId();

const userSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(100000000).max(999999999).required(),
    password: Joi.string().min(8).max(50).required(),
});

const validateBook = book => {
    return Joi.validate(book, bookSchema);
};

const validateBookId = id => {
    return Joi.validate(id, bookIdSchema);
};

const validateUser = user => {
    return Joi.validate(user, userSchema);
}

module.exports = {
    validateBook,
    validateBookId,
    validateUser
};
