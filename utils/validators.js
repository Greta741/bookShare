const Joi = require('joi');
const { types, cities } = require('./constants');
Joi.objectId = require('joi-objectid')(Joi);

const today = new Date();

const bookSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    author: Joi.string().min(3).max(30).required(),
    year: Joi.number().integer().min(1900).max(today.getFullYear()),
    types: Joi.array().items(Joi.string().valid(types)).required(),
    city: Joi.string().valid(cities),
    pages: Joi.number().integer().min(0).max(10000),
    tradable: Joi.boolean().required(),
    forSell: Joi.boolean(),
    price: Joi.number().min(0).max(10000),
}).with('forSell', 'price');

const bookIdSchema = Joi.objectId();

const validateBook = book => {
    return Joi.validate(book, bookSchema);
};

const validateBookId = id => {
    return Joi.validate(id, bookIdSchema);
};

module.exports = {
    validateBook,
    validateBookId
};
