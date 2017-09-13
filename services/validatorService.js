const Joi = require('joi');

const today = new Date();
const genres = ['romance', 'comedy', 'fantasy'];
const cities = ['Kaunas', 'Vilnius'];

const bookSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    author: Joi.string().min(3).max(30).required(),
    year: Joi.number().integer().min(1900).max(today.getFullYear()),
    genre: Joi.array().items(Joi.string().valid(genres)).required(),
    city: Joi.string().valid(cities),
    pages: Joi.number().integer().min(0).max(10000),
    tradable: Joi.boolean().required(),
    forSell: Joi.boolean().required(),
    price: Joi.number().integer().min(0).max(10000),
}).with('forSell', 'price');

const validateBook = book => {
    return Joi.validate(book, bookSchema);
};

module.exports = {
    validateBook
};
