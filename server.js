const express = require('express');
const mongoDb = require('./database/mongoDb.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('Hello World');
})

const server = app.listen(8081, () => {
    mongoDb.mongoConnect();
    const host = server.address().address
    const port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})