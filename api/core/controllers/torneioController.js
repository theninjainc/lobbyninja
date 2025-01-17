const torneioService = require('../services/torneioService');

const saveFilter = async (req, res) => {
    try {
        const { email, filters } = req.body;
        console.log(email, filters)
        if (!email) {
            return res.status(400).json({ error: "O ID do usuário é obrigatório." });
        }

        if (!filters || typeof filters !== "object") {
            return res.status(400).json({ error: "Os filtros são obrigatórios e devem ser um objeto." });
        }

        const savedFilter = await torneioService.saveUserFilter(email, filters);
        res.status(201).json({ message: "Filtro salvo com sucesso.", filter: savedFilter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const applyFilter = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        if (!email) {
            return res.status(400).json({ error: "O ID do usuário é obrigatório." });
        }

        const filteredLobbies = await torneioService.getFilteredLobbies(email);
        console.log(filteredLobbies)
        res.status(200).json(filteredLobbies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
    saveFilter,
    applyFilter,
};
