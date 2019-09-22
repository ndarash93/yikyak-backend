const express = require('express');
const router = express.Router();
const test = require('./test');
const { pool } = require('/home/pi/Documents/cookingWithFriends/backend/middleware');

router.use('/test', test);

router.get('/', (req, res) => {
    const payload = {
        'index': 0
    }
    res.json(payload);
});

router.get('/items', (req, res) => {
    res.json({
        'stuff': 'stuff'
    })
});

module.exports = router;