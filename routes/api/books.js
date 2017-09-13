const router = require('express').Router();
const bookService = require('../../services/booksService');

router.get('/', (req, res) => {
    res.json({ status: 'get' });
});

router.get('/:id', (req, res) => {
    bookService.getBook(req.params.id).then((book) => {
        if (book) {
            res.status(200);
            res.send(book);
        } else {
            res.status(404);
            res.send();
        }
    }, (err) => {
        res.status(404);
        res.send();
    });
});

router.post('/', (req, res) => {
    bookService.createBook({name: 'test book'}).then(() => {
        res.status(201);
        res.send();
    }).catch((error) => {
        console.log('failed to save')
    })
});

router.put('/:id', (req, res) => {
    res.json({ status: 'put/id' });
});

router.delete('/:id', (req, res) => {
    res.json({ status: 'delete/id' });
});

module.exports = router;