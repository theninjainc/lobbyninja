const sdk = require('node-appwrite');
const { databases } = require('../config/appwriteClient');

const DATABASE_ID = '6759f9f40015f31d86bb';
const USER_COLLECTION_ID = 'user';

const getFavouriteLobbys = async (email) => {
    try {
        // 1. Busca o usuário pelo e-mail
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);

        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        // 2. Obtém o primeiro usuário encontrado
        const user = usersResponse.documents[0];

        console.log(user)
        const favouriteLobbys = user.lobby ? user.lobby.filter(lobby => lobby.favourite === true) : [];

        // 4. Retorna os lobbys favoritos filtrados
        return favouriteLobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys favoritos: " + error.message);
    }
};

module.exports = { getFavouriteLobbys };
