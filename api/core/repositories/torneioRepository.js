const { databases } = require('../config/appwriteClient');

const DATABASE_ID = '6759f9f40015f31d86bb';
const COLLECTION_ID = 'lobby';

const getAllTorneios = async () => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents;
    } catch (error) {
        throw new Error('Erro ao buscar torneios: ' + error.message);
    }
};

const createTorneio = async (torneioData) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            'unique()',
            torneioData
        );
        return response;
    } catch (error) {
        throw new Error('Erro ao criar torneio: ' + error.message);
    }
};

const getTorneioById = async (id) => {
    try {
        const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        return response;
    } catch (error) {
        throw new Error('Erro ao buscar torneio: ' + error.message);
    }
};

const updateTorneio = async (id, torneioData) => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id,
            torneioData
        );
        return response;
    } catch (error) {
        throw new Error('Erro ao atualizar torneio: ' + error.message);
    }
};

const deleteTorneio = async (id) => {
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        return { message: 'Torneio deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar torneio: ' + error.message);
    }
};

module.exports = { getAllTorneios, createTorneio, getTorneioById, updateTorneio, deleteTorneio };
