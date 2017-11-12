const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoDb = require('./database/mongoDb.js');

const port = 8081;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const server = app.listen(port, () => {
    mongoDb.mongoConnect();
    const host = server.address().address;
    const port = server.address().port;

    console.log("Listening at http://%s:%s", host, port)
})