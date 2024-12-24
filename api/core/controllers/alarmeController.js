const alarmeService = require('../services/alarmeService');

const getAllAlarmesHandler = async (req, res) => {
    try {
        const alarmes = await alarmeService.getAllAlarmes();
        res.status(200).json(alarmes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAlarmeHandler = async (req, res) => {
    try {
        const alarme = await alarmeService.createAlarme(req.body);
        res.status(201).json(alarme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAlarmeByIdHandler = async (req, res) => {
    try {
        const alarme = await alarmeService.getAlarmeById(req.params.id);
        res.status(200).json(alarme);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateAlarmeHandler = async (req, res) => {
    try {
        const alarme = await alarmeService.updateAlarme(req.params.id, req.body);
        res.status(200).json(alarme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAlarmeHandler = async (req, res) => {
    try {
        const message = await alarmeService.deleteAlarme(req.params.id);
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllAlarmesHandler,
    createAlarmeHandler,
    getAlarmeByIdHandler,
    updateAlarmeHandler,
    deleteAlarmeHandler,
};
