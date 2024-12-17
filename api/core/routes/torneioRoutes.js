const express = require('express');
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
} = require('../controllers/torneioController');

const router = express.Router();

router.get('/', getAllTorneiosHandler);
router.post('/', createTorneioHandler);
router.get('/:id', getTorneioByIdHandler);
router.put('/:id', updateTorneioHandler);
router.delete('/:id', deleteTorneioHandler);

module.exports = router;
