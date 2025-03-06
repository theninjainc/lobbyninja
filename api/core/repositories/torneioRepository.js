const { databases } = require('../config/appwriteClient');
const sdk = require('node-appwrite');
const { Query } = sdk;

const DATABASE_ID = '6759f9f40015f31d86bb';
const COLLECTION_ID = 'lobby';
const USER_COLLECTION_ID = 'user';

const saveFilterToDB = async (email, filters) => {
    try {
        if (filters.Site && Array.isArray(filters.Site)) {
            filters.Site = filters.Site.map(site => site.network || site);
        }

        console.log(email, filters);

        // Buscar o usuário pelo e-mail
        const userList = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email)
        ]);
        console.log(userList);

        // Verifica se o usuário foi encontrado
        if (userList.documents.length === 0) {
            throw new Error("Usuário não encontrado com o e-mail fornecido.");
        }

        const user = userList.documents[0];
        console.log(filters.Site);

        console.log("cheguei daqui");

        // Verificar se já existe um filtro com o mesmo nameFilter no array user.filters
        const existingFilterIndex = user.filters.findIndex(filter => {
            console.log('Comparando:', filters.NameFilter, filter.NameFilter);
            return filter.NameFilter === filters.NameFilter;
        });

        if (existingFilterIndex !== -1) {
            // Se o filtro já existe, substituímos o filtro específico dentro de user.filters
            user.filters[existingFilterIndex] = { ...user.filters[existingFilterIndex], ...filters }; // Atualiza o filtro específico
            console.log("Filtro atualizado no array do usuário:", user.filters[existingFilterIndex]);
        } else {
            console.log("Filtro não encontrado, criando novo...");
            const filterDocument = await databases.createDocument(
                DATABASE_ID,
                'filters',
                'unique()',
                filters
            );
            console.log("Novo filtro criado:", filterDocument);
            user.filters.push(filterDocument.$id); // Adiciona o novo filtro ao array de filtros do usuário
        }


        // Atualiza o documento do usuário com o array de filtros atualizado
        console.log("Foi??", user.filters[existingFilterIndex])
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            user.$id,
            { filters: user.filters }
        );

        console.log("Deu certo");

        return updatedUser;
    } catch (error) {
        throw new Error("Erro ao salvar os filtros no banco: " + error.message);
    }
};

const getFiltersByEmail = async (email) => {
    try {
        // Busca o documento do usuário pelo e-mail
        const userList = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            Query.equal("email", email)
        ]);

        if (userList.documents.length === 0) {
            return null; // Retorna null se o usuário não foi encontrado
        }

        const user = userList.documents[0]; // Seleciona o primeiro documento encontrado

        return user.filters || null; // Retorna os filtros ou null caso não existam
    } catch (error) {
        throw new Error("Erro ao buscar filtros: " + error.message);
    }
};


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

module.exports = {
    getAllTorneios, createTorneio, getTorneioById, updateTorneio, deleteTorneio, saveFilterToDB,
    getFiltersByEmail,
};
