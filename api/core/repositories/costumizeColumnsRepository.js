const sdk = require('node-appwrite');
const { databases } = require('../config/appwriteClient');
const { Query } = sdk;

const DATABASE_ID = '6759f9f40015f31d86bb';
const COLLECTION_ID = 'costumizeColumns';
const USER_COLLECTION_ID = 'user';

// Função para buscar as colunas do usuário
const getColumns = async (email) => {
    try {
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);

        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        const user = usersResponse.documents[0];
        if (user.costumizeColumns) {
            return user.costumizeColumns;
        } else {
            return []; // Retorna um array vazio se não houver colunas salvas
        }
    } catch (error) {
        throw new Error('Erro ao buscar colunas: ' + error.message);
    }
};

// Função para salvar as colunas no usuário
const saveColumns = async (userEmail, columns) => {
    try {
        const existingColumns = await getColumns(userEmail);

        if (existingColumns && existingColumns.length > 0) {
            // Se já existem colunas, atualiza
            const docID = existingColumns[0].$id;
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docID, { columns });
            console.log("Colunas atualizadas.");
        } else {
            // Se não existem colunas, cria um novo documento para o usuário
            const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
                sdk.Query.equal("email", userEmail),
            ]);
            const user = usersResponse.documents[0];

            // Adiciona as colunas ao usuário
            await databases.createDocument(DATABASE_ID, USER_COLLECTION_ID, 'unique', {
                user: user.$id,
                columns: columns
            });
            console.log("Colunas salvas com sucesso.");
        }

        return { message: 'Colunas salvas com sucesso' };
    } catch (error) {
        throw new Error('Erro ao salvar colunas: ' + error.message);
    }
};

module.exports = { getColumns, saveColumns };
