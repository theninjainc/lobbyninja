const torneioService = require('../services/torneioService');

const getAllTorneiosHandler = async (req, res) => {
    try {
        const torneios = await torneioService.getAllTorneios();
        res.status(200).json(torneios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTorneioHandler = async (req, res) => {
    try {
        const torneio = await torneioService.createTorneio(req.body);
        res.status(201).json(torneio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTorneioByIdHandler = async (req, res) => {
    try {
        const torneio = await torneioService.getTorneioById(req.params.id);
        res.status(200).json(torneio);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateTorneioHandler = async (req, res) => {
    try {
        const torneio = await torneioService.updateTorneio(req.params.id, req.body);
        res.status(200).json(torneio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTorneioHandler = async (req, res) => {
    try {
        const message = await torneioService.deleteTorneio(req.params.id);
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
};
