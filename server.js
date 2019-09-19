const express = require('express');
const app = express();
const logger = require('./middleware');
const api = require('./api/index');

const port = 27817;

app.use(logger);
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hellow World!');
})

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
});
