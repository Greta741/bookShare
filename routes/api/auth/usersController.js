const router = require('express').Router();
const usersDb = require('../../../database/usersDb');
const validator = require('../../../utils/validators');
const authController = require('./authController');
const oauth2ControllerV2 = require('./oauth2ControllerV2');

router.post('/', (req, res) => {
    const userValidationResult = validator.validateUser(req.body);
    if (userValidationResult.error) {
        res.status(400);
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

router.post('/authorize', authController.isAuthenticated, oauth2ControllerV2.authorizationGrant);

router.post('/token', authController.isClientAuthenticated, oauth2ControllerV2.token);

module.exports = router;