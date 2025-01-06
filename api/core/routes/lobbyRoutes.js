const express = require('express');
const { getLobbysHandler, updateStateHandler, createLobbyHandler } = require('../controllers/lobbyController');

const router = express.Router();

router.post('/lobbyAllOptions', getLobbysHandler);
router.put('/lobbyUpdateOptions', updateStateHandler);
router.post('/lobbyCreate', createLobbyHandler);

module.exports = router;
