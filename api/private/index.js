const express = require('express');
const router = express.Router();
const test = require('./test');

router.use('/test', test);





router.get('/', (req, res) => {
    const payload = {
        'index': 0
    }
    res.json(payload);
});

module.exports = router;