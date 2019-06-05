const express = require('express');
const { markerController } = require('../controllers');

const router = express.Router();

router.get('/', markerController.getAll);

module.exports = router;