const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const payload = {
        'test': 'test'
    }
    res.json(payload);
});

module.exports = router;