const router = require('express').Router();
const booksDb = require('../../database/booksDb');
const validator = require('../../utils/validators');
const authController = require('./auth/authController');

router.get('/', (req, res) => {
    booksDb.getBooks().then(books => {
        res.status(200);
        res.json(books);
    }, () => {
        res.sendStatus(503);
    });
});

router.get('/:id', (req, res) => {
    booksDb.getBook(req.params.id).then(book => {
        if (book) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }, () => {
        res.sendStatus(503);
    });
});

router.post('/', authController.isAuthenticated, (req, res) => {
    const bookValidationResult = validator.validateBook(req.body);
    if (bookValidationResult.error) {
        res.sendStatus(400);
        return;
    }
    booksDb.createBook(req.body, req.user).then(() => {
        res.status(201);
        res.json({});
        res.send();
    }, () => {
        res.sendStatus(503);
    });
});

router.put('/:id', authController.isAuthenticated, (req, res) => {
    const idValidationResult = validator.validateBookId(req.params.id);
    const bookValidationResult = validator.validateBook(req.body);

    if (idValidationResult.error || bookValidationResult.error) {
        res.sendStatus(400);
        return;
    }

    booksDb.getBook(req.params.id).then(book => {
        if (!book) {
            res.sendStatus(404);
            return;
        }
        if (book.userId.toString() === req.user._id.toString()) {
            booksDb.updateBook(req.params.id, req.body, req.user).then(data => {
                if (data.result.n === 0) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(204);
                }
            }, () => {
                res.sendStatus(503);
            });
        } else {
            res.sendStatus(401)
        }
    })

});

router.delete('/:id', authController.isAuthenticated, (req, res) => {
    const idValidationResult = validator.validateBookId(req.params.id);

    if (idValidationResult.error) {
        res.status(400);
        res.send();
        return;
    }

    booksDb.getBook(req.params.id).then(book => {
        if (!book) {
            res.sendStatus(404);
            return;
        }
        if (book.userId.toString() === req.user._id.toString()) {
            booksDb.deleteBook(req.params.id).then(data => {
                if (data.result.n === 0) {
                    res.status(404);
                    res.send();
                } else {
                    res.status(204);
                    res.send();
                }
            }, () => {
                res.status(503);
                res.send();
            });
        } else {
            res.sendStatus(401)
        }
    });
});

module.exports = router;