const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt-nodejs');
const usersDb = require('../../../database/usersDb');

passport.use(new BasicStrategy(
    (email, password, callback) => {
        usersDb.getUser(email).then((user, err) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }

            if (bcrypt.compareSync(password, user.password)) {
                return callback(null, user)
            } else {
                return callback(null, false)
            }
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });