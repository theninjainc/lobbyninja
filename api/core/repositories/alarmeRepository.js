const { databases } = require('../config/appwriteClient');

const DATABASE_ID = '6759f9f40015f31d86bb';
const COLLECTION_ID = 'alarm';
const getAllAlarmes = async () => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents;
    } catch (error) {
        throw new Error('Erro ao buscar alarmes: ' + error.message);
    }
};

const createAlarme = async (alarmeData) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            'unique()',
            alarmeData
        );
        return response;
    } catch (error) {
        throw new Error('Erro ao criar alarme: ' + error.message);
    }
};

const getAlarmeById = async (id) => {
    try {
        const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        return response;
    } catch (error) {
        throw new Error('Erro ao buscar alarme: ' + error.message);
    }
};

const updateAlarme = async (id, alarmeData) => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id,
            alarmeData
        );
        return response;
    } catch (error) {
        throw new Error('Erro ao atualizar alarme: ' + error.message);
    }
};

const deleteAlarme = async (id) => {
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        return { message: 'Alarme deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar alarme: ' + error.message);
    }
};

module.exports = { getAllAlarmes, createAlarme, getAlarmeById, updateAlarme, deleteAlarme };
