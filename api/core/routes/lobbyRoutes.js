const express = require('express');
const { getFavouriteLobbysHandler } = require('../controllers/lobbyController');

const router = express.Router();

router.post('/favourite', getFavouriteLobbysHandler);

module.exports = router;
