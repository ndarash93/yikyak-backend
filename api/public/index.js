const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        'Public': 'Test'
    })
});

router.get('/items', (req, res) => {
    res.json({
        'items': 'test'
    })
});

module.exports = router;