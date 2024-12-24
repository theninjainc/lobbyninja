const torneioRepository = require('../repositories/torneioRepository');

const getAllTorneios = async () => {
    return await torneioRepository.getAllTorneios();
};

const createTorneio = async (torneioData) => {
    return await torneioRepository.createTorneio(torneioData);
};

const getTorneioById = async (id) => {
    return await torneioRepository.getTorneioById(id);
};

const updateTorneio = async (id, torneioData) => {
    return await torneioRepository.updateTorneio(id, torneioData);
};

const deleteTorneio = async (id) => {
    return await torneioRepository.deleteTorneio(id);
};

module.exports = { getAllTorneios, createTorneio, getTorneioById, updateTorneio, deleteTorneio };
