const express = require('express');
const app = express();
const mongoDb = require('./services/mongoDbService.js');


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