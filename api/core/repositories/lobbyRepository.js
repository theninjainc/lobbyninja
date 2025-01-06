const sdk = require('node-appwrite');
const { databases } = require('../config/appwriteClient');
const { Query } = sdk;

const DATABASE_ID = '6759f9f40015f31d86bb';
const USER_COLLECTION_ID = 'user';
const LOBBY_COLLECTION_ID = 'lobby';

// Função para buscar lobbys por estado
const getLobbysByState = async (email, state) => {
    try {
        // 1. Busca o usuário pelo e-mail
        console.log(email, state)
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);

        console.log(usersResponse)

        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        // 2. Obtém o primeiro usuário encontrado
        const user = usersResponse.documents[0];

        // 3. Filtra os lobbys com base no estado
        console.log(user.lobby)
        const filteredLobbys = user.lobby
            ? user.lobby.filter(lobby => lobby[state] === true)  // Filtro baseado no estado (favourite, registered, skipped, deleted)
            : [];


        // 4. Retorna os lobbys filtrados pelo estado
        return filteredLobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys pelo estado: " + error.message);
    }
};

// Funções específicas para cada estado, facilitando o uso no controlador
const getFavouriteLobbys = async (email) => {
    return await getLobbysByState(email, 'favourite');
};

const getRegisteredLobbys = async (email) => {
    return await getLobbysByState(email, 'registered');
};

const getSkippedLobbys = async (email) => {
    return await getLobbysByState(email, 'skipped');
};

const getDeletedLobbys = async (email) => {
    return await getLobbysByState(email, 'deleted');
};

const getAlarmLobbys = async (email) => {
    return await getLobbysByState(email, 'alarm');
};

const updateLobbyState = async (email, id, state, value) => {
    try {
        // 1. Busca o documento do usuário pelo e-mail
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);

        console.log(usersResponse)

        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        // 2. Obtém o primeiro documento (usuário)
        const user = usersResponse.documents[0];

        console.log(user.lobby)
        // 3. Verifica se o usuário possui lobbys
        if (!user.lobby || !Array.isArray(user.lobby)) {
            throw new Error("Nenhum lobby associado ao usuário.");
        }


        // 4. Localiza o índice do lobby a ser atualizado
        const lobbyIndex = user.lobby.findIndex(lobby => lobby.$id === id);

        console.log(lobbyIndex)

        if (lobbyIndex === -1) {
            throw new Error("Lobby não encontrado no array.");
        }

        // 5. Atualiza o estado do lobby no índice correspondente
        user.lobby[lobbyIndex][state] = value;

        console.log("Oieeeeee")

        // 6. Atualiza o documento no banco de dados
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            user.$id,
            { lobby: user.lobby }
        );

        // 7. Retorna o lobby atualizado
        return updatedUser.lobby[lobbyIndex];
    } catch (error) {
        throw new Error("Erro ao atualizar o estado do lobby: " + error.message);
    }
};

const createLobby = async (
    site,
    horarioInicio,
    horarioFim,
    nome,
    buyIn,
    premiacaoGarantida,
    reentrada,
    blindIntervalo,
    jogadoresInscritos,
    jogadoresMesa,
    jogadoresJogando,
    bounty,
    fichasIniciais,
    apostaForcada,
    skipped,
    deleted,
    favourite,
    registered,
    alarm,
) => {
    try {
        buyIn = parseFloat(buyIn)
        jogadoresInscritos = parseFloat(jogadoresInscritos)
        jogadoresJogando = parseFloat(jogadoresJogando)
        jogadoresMesa = jogadoresMesa ? parseFloat(jogadoresMesa) : 0;
        if (reentrada == "Yes")
            reentrada = 1;
        else
            reentrada = 0

        blindIntervalo = 0;

        const newLobbys = {
            site,
            horarioInicio,
            horarioFim,
            nome,
            buyIn,
            premiacaoGarantida,
            reentrada,
            blindIntervalo,
            jogadoresInscritos,
            jogadoresMesa,
            jogadoresJogando,
            bounty,
            fichasIniciais,
            apostaForcada,
            skipped,
            deleted,
            favourite,
            registered,
            alarm,
        };
        console.log(site, horarioInicio,
            horarioFim,
            nome,
            parseFloat(buyIn),
            premiacaoGarantida,
            reentrada,
            blindIntervalo,
            jogadoresInscritos,
            jogadoresMesa,
            jogadoresJogando,
            bounty,
            fichasIniciais,
            apostaForcada,
            skipped,
            deleted,
            favourite,
            registered,
            alarm,)
        console.log("oi", blindIntervalo)

        console.log(reentrada)
        const createdLobby = await databases.createDocument(
            DATABASE_ID,
            LOBBY_COLLECTION_ID,
            sdk.ID.unique(),
            newLobbys
        );
        console.log("oiiii")

        return createdLobby;
    } catch (error) {
        throw new Error("Erro ao criar lobby: " + error.message);
    }
};

const findUserByEmail = async (email) => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            USER_COLLECTION_ID,
            [
                Query.equal("email", email),
            ]
        );

        // Verifica se encontrou um usuário
        return result.documents.length > 0 ? result.documents[0] : null;
    } catch (error) {
        throw new Error("Erro ao buscar usuário pelo e-mail: " + error.message);
    }
};

const linkLobbyToUser = async (userId, lobbyId) => {
    try {
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            userId,
            {
                lobby: [lobbyId],
            }
        );

        return updatedUser;
    } catch (error) {
        throw new Error("Erro ao vincular lobby ao usuário: " + error.message);
    }
};

module.exports = {
    getFavouriteLobbys,
    getRegisteredLobbys,
    getSkippedLobbys,
    getDeletedLobbys,
    updateLobbyState,
    getAlarmLobbys,
    createLobby,
    findUserByEmail,
    linkLobbyToUser,
};
