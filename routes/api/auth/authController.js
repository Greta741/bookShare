const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt-nodejs');
const BearerStrategy = require('passport-http-bearer').Strategy;
const usersDb = require('../../../database/usersDb');
const authDb = require('../../../database/authDb');

passport.use(new BasicStrategy(
    (email, password, callback) => {
        usersDb.getUser(email).then((user, err) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }

            if (bcrypt.compareSync(password, user.password)) {  // TODO: fix this
                console.log('password does not match');
                return callback(null, user);
            } else {
                console.log('ok');
                return callback(null, user);
            }
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    (id, secret, callback) => {
        authDb.getClient(id).then((client, err) => {
            if (err) {
                return callback(err);
            }
            if (!client || client.secret !== secret) {
                return callback(null, false);
            }
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    (accessToken, callback) => {
        authDb.getToken(accessToken).then((token, err) => {
            if (err) {
                return callback(err);
            }
            if (!token) {
                return callback(null, false);
            }
            usersDb.getUserById(token.userId).then((user, err) => {
                if (err) {
                    return callback(err);
                }
                if (!user) {
                    return callback(null, false);
                }
                callback(null, user, { scope: '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
