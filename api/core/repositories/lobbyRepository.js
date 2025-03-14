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


        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        // 2. Obtém o primeiro usuário encontrado
        const user = usersResponse.documents[0];

        const filteredLobbys = user.lobby
            ? user.lobby.filter(lobby => lobby[state] === true)
            : [];
        return filteredLobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys pelo estado: " + error.message);
    }
};

const getLobbysGeral = async (email, state) => {
    try {
        // 1. Busca o usuário pelo e-mail
        console.log(email, state)
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);


        if (usersResponse.documents.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        // 2. Obtém o primeiro usuário encontrado
        const user = usersResponse.documents[0];

        console.log(user.lobby.map((lobby) => lobby.$id))
        const filteredLobbys = user.lobby
            ? user.lobby.filter(lobby => lobby[state] === true || lobby.priority) // Filtro baseado no estado (favourite, registered, skipped, deleted)
            : [];
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

        console.log("teste")
        // 1. Busca o documento do usuário pelo e-mail
        const usersResponse = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
            sdk.Query.equal("email", email),
        ]);

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
    ID,
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
    priority
) => {
    try {
        // Converte valores para os tipos 
        console.log("TESTE", priority);
        buyIn = parseFloat(buyIn);
        premiacaoGarantida = parseFloat(premiacaoGarantida);
        jogadoresInscritos = parseFloat(jogadoresInscritos);
        jogadoresJogando = parseFloat(jogadoresJogando);
        jogadoresMesa = jogadoresMesa ? parseFloat(jogadoresMesa) : 0;
        if (reentrada == "Yes") reentrada = 1;
        else reentrada = 0;
        blindIntervalo = 0;

        // Cria o objeto do novo lobby
        const newLobby = {
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
            priority
        };

        let existingLobby;

        try {
            // Tenta buscar o lobby existente
            existingLobby = await databases.getDocument(DATABASE_ID, LOBBY_COLLECTION_ID, ID);
        } catch (err) {
            // Se o erro for porque o documento não existe, isso é esperado, e continuamos com a criação
            if (err.message.includes("not found") || err.message.includes("Document with the requested ID could not be found")) {
                existingLobby = null;
            } else {
                // Caso seja outro erro, lança novamente
                throw err;
            }
        }

        if (existingLobby) {
            // Se o lobby já existe, atualiza
            const updatedLobby = await databases.updateDocument(
                DATABASE_ID,
                LOBBY_COLLECTION_ID,
                ID,
                newLobby
            );
            console.log(`Lobby com ID ${ID} atualizado com sucesso.`);
            return updatedLobby;
        } else {
            // Caso o lobby não exista, cria um novo
            const createdLobby = await databases.createDocument(
                DATABASE_ID,
                LOBBY_COLLECTION_ID,
                ID, // Aqui, o ID pode ser opcional, dependendo de como o banco gera IDs
                newLobby
            );
            console.log(`Lobby com ID ${ID} criado com sucesso.`);
            return createdLobby;
        }
    } catch (error) {
        throw new Error("Erro ao criar ou atualizar lobby: " + error.message);
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
        // Buscar o usuário atual para pegar o valor do lobby
        const user = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);

        // Adicionar o lobbyId ao array existente, sem sobrescrever
        const updatedLobby = user.lobby ? [...user.lobby, lobbyId] : [lobbyId];

        // Atualizar o documento com o novo array de lobbies
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            userId,
            {
                lobby: updatedLobby,
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
    getLobbysByState,
    getLobbysGeral,
};
