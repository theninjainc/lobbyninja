const alarmeRepository = require('../repositories/alarmeRepository');

const getAllAlarmes = async () => {
    return await alarmeRepository.getAllAlarmes();
};

const createAlarme = async (alarmeData) => {
    return await alarmeRepository.createAlarme(alarmeData);
};

const getAlarmeById = async (id) => {
    return await alarmeRepository.getAlarmeById(id);
};

const updateAlarme = async (id, alarmeData) => {
    return await alarmeRepository.updateAlarme(id, alarmeData);
};

const deleteAlarme = async (id) => {
    return await alarmeRepository.deleteAlarme(id);
};

module.exports = { getAllAlarmes, createAlarme, getAlarmeById, updateAlarme, deleteAlarme };
