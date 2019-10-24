const express = require('express');
const router = express.Router();
const post = require('./posts/post');

router.get('/', (req, res) => {
    res.json({
        'Public': 'Test'
    })
});

router.use('/posts', post);


module.exports = router;