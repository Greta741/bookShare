const router = require('express').Router();

router.use('/books', require('./booksController'));
router.use('/users', require('./auth/usersController'));

module.exports = router;