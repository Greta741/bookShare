const router = require('express').Router();
const bookService = require('../../services/booksService');
const validator = require('../../utils/validators');

router.get('/', (req, res) => {
    bookService.getBooks().then(books => {
        res.status(200);
        res.json(books);
    }, () => {
        res.status(503);
        res.send();
    });
});

router.post('/search/', (req, res) => {
    bookService.getBooksByParams(req.body).then(books => {
        res.status(200);
        res.json(books);
    }, () => {
        res.status(503);
        res.send();
    });
});

router.get('/:id', (req, res) => {
    bookService.getBook(req.params.id).then(book => {
        if (book) {
            res.status(200);
            res.send(book);
        } else {
            res.status(404);
            res.send();
        }
    }, () => {
        res.status(503);
        res.send();
    });
});

router.post('/', (req, res) => {
    const bookValidationResult = validator.validateBook(req.body);
    if (bookValidationResult.error) {
        res.status(400);
        res.send();
        return;
    }
    bookService.createBook(req.body).then(() => {
        res.status(201);
        res.send();
    }, () => {
        res.status(503);
        res.send();
    });
});

router.put('/:id', (req, res) => {
    const idValidationResult = validator.validateBookId(req.params.id);
    const bookValidationResult = validator.validateBook(req.body);

    if (idValidationResult.error || bookValidationResult.error) {
        res.status(400);
        res.send();
        return;
    }

    bookService.updateBook(req.params.id, req.body).then(data => {
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
});

router.delete('/:id', (req, res) => {
    const idValidationResult = validator.validateBookId(req.params.id);

    if (idValidationResult.error) {
        res.status(400);
        res.send();
        return;
    }

    bookService.deleteBook(req.params.id).then(data => {
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
});

module.exports = router;