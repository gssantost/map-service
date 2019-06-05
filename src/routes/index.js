const express = require('express');

const router = express.Router();

router.use('/markers', require('./marker'));

module.exports = router;