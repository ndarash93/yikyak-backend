const express = require('express');
const router = express.Router();
const private = require('./private/index');
const public = require('./public/index');

router.use('/private', private);
router.use(public);


module.exports = router;