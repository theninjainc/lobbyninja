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

const saveUserFilter = async (email, filters) => {
    try {
        console.log(email, filters)
        if (!email) throw new Error("O ID do usuário é obrigatório.");
        if (!filters || typeof filters !== "object") throw new Error("Filtros inválidos.");

        const savedFilter = await torneioRepository.saveFilterToDB(email, filters);
        return savedFilter;
    } catch (error) {
        throw new Error("Erro ao salvar filtros: " + error.message);
    }
};

const getFilteredLobbies = async (email) => {
    try {
        const filters = await torneioRepository.getFiltersByEmail(email);
        if (!filters) throw new Error("Filtros não encontrados.");
        console.log(filters)
        return filters;
    } catch (error) {
        throw new Error("Erro ao aplicar filtros: " + error.message);
    }
};

module.exports = {
    getAllTorneios, createTorneio, getTorneioById, updateTorneio, deleteTorneio, saveUserFilter,
    getFilteredLobbies,
};
