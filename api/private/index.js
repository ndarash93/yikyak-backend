const express = require('express');
const router = express.Router();
const { verify } = require('../../middleware');
const posts = require('./posts/posts');
const profile = require('./profile/profile');
const mongoose = require('mongoose');

router.use(verify);
router.use('/posts', posts);
router.use('/profile', profile);

router.get('/', (req, res) => {
    const payload = {
        'index': 0
    }
    res.json(payload);
});

module.exports = router;