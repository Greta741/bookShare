const router = require('express').Router();

router.use('/books', require('./booksController'));
router.use('/users', require('./auth/usersController'));
router.use('/oauth2', require('./auth/oauth2Controller'));

module.exports = router;