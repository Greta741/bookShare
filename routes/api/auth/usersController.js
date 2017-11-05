const router = require('express').Router();
const usersDb = require('../../../database/usersDb');
const validator = require('../../../utils/validators');

router.post('/', async (req, res) => {
    const userValidationResult = validator.validateUser(req.body);
    if (userValidationResult.error) {
        res.status(400);
        res.send();
        return;
    }
    const user = await usersDb.getUser(req.body.email);
    if (user) {
        res.json({ error: 'Email already exists'});
        res.send();
        return;
    }
    usersDb.createUser(req.body).then(() => {
        res.status(201);
        res.json({});
        res.send();
    }, () => {
        res.status(503);
        res.send();
    });
});

module.exports = router;