const express = require('express');
const app = express();
const https = require('https');
const { logger, errLogger, CORS, verify } = require('./middleware');
const api = require('./api/index');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 27817;

const db = require('./models/db').db

app.use(bodyParser.json());
//app.use(verify);
app.use(logger);
app.use(errLogger);
app.use(CORS);

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hellow World!');
});

/*
https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, app).listen(port, _ => {
    console.log(`Listening on port ${port}`);
});
*/

app.listen(port, _ => {
    console.log(`Listening on port ${port}`);
});