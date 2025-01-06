const express = require('express');
const {
    getAllAlarmesHandler,
    createAlarmeHandler,
    getAlarmeByIdHandler,
    updateAlarmeHandler,
    deleteAlarmeHandler,
} = require('../controllers/alarmeController');

const router = express.Router();

router.get('/', getAllAlarmesHandler);
router.post('/', createAlarmeHandler);
router.get('/:id', getAlarmeByIdHandler);
router.put('/:id', updateAlarmeHandler);
router.delete('/:id', deleteAlarmeHandler);

module.exports = router;
