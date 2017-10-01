const router = require('express').Router();

router.use('/books', require('./booksService'));

module.exports = router;