const authDb = require('../../../database/authDb');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authController = require('./authController');

const authorizationGrant = async (req, res) => {
    const client = await authDb.getClient(req.query.client_id);
    if (client && client.id === req.user.clientId) {
        const newCode = uid(20);
        const result = await authDb.createCode({
            clientId: client._id,
            userId: req.user._id,
            value: newCode
        });
        res.json({value: newCode})
    } else {
        res.sendStatus(401)
    }
};

const token = async (req, res) => {
    const code = await authDb.getCode(req.body.code);
    if (code) {
        const newToken = jwt.sign({
            userId: code.userId,
            clientId: code.clientId,
            value: uid(20)
        }, 'secret');
        const result = await authDb.createToken({
            token: newToken,
            userId: code.userId,
            clientId: code.clientId
        });
        res.json({ token: newToken, userId: code.userId });
    } else {
        res.sendStatus(401)
    }
};

const uid =(len) => {
    const buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/authorize', authController.isAuthenticated, authorizationGrant);

router.post('/token', authController.isClientAuthenticated, token);

module.exports = router;