const {
    getFavouriteLobbys,
    getRegisteredLobbys,
    getSkippedLobbys,
    getDeletedLobbys,
    updateLobbyState,
    getAlarmLobbys,
    createLobby,
    findUserByEmail,
    linkLobbyToUser,
} = require('../repositories/lobbyRepository');

const getLobbysByStates = async (email, states) => {
    try {
        let lobbys = [];

        // Verificar os estados solicitados e chamar as funções apropriadas
        if (states.includes('favourite')) {
            const favouriteLobbys = await getFavouriteLobbysByUser(email);
            lobbys = [...lobbys, ...favouriteLobbys];
        }

        if (states.includes('registered')) {
            const registeredLobbys = await getRegisteredLobbysByUser(email);
            lobbys = [...lobbys, ...registeredLobbys];
        }

        if (states.includes('skipped')) {
            const skippedLobbys = await getSkippedLobbysByUser(email);
            lobbys = [...lobbys, ...skippedLobbys];
        }

        if (states.includes('deleted')) {
            const deletedLobbys = await getDeletedLobbysByUser(email);
            lobbys = [...lobbys, ...deletedLobbys];
        }

        if (states.includes('alarm')) {
            const alarmLobbys = await getAlarmLobbysByUser(email);
            lobbys = [...lobbys, ...alarmLobbys];
        }

        // Retornar todos os lobbies encontrados
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys por estado: " + error.message);
    }
};


const createNewLobby = async (email, lobbies) => {
    try {
        if (!email) throw new Error("Email é obrigatório.");
        if (!Array.isArray(lobbies) || lobbies.length === 0) throw new Error("Lobbies inválidos.");

        const userDocument = await findUserByEmail(email);
        if (!userDocument) throw new Error("Usuário não encontrado.");

        const userId = userDocument.$id;

        // Função para dar o atraso de 1 segundo
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        const createLobbiesInBatches = async (lobbies) => {
            const createdLobbyIds = [];
            for (let i = 0; i < lobbies.length; i += 6) {
                const batch = lobbies.slice(i, i + 6);

                // Processa o lote de 6 lobbies
                const createdLobbyPromises = batch.map(async (lobby) => {
                    try {
                        const {
                            ID,
                            Site,
                            Start: horarioInicio,
                            End: horarioFim,
                            Name: nome,
                            BuyIn: buyIn,
                            PrizePool: premiacaoGarantida,
                            MaxReentry: reentrada,
                            Blinds: blindIntervalo,
                            Field: jogadoresInscritos,
                            TableSize: jogadoresMesa,
                            Mlr: jogadoresJogando,
                            bounty,
                            fichasIniciais,
                            apostaForcada,
                            skipped,
                            deleted,
                            favourite,
                            registered,
                            alarm,
                            Priority: priority
                        } = lobby;

                        // Criar o lobby com os dados extraídos
                        const newLobby = await createLobby(
                            ID,
                            Site,
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
                        );

                        // Vincula o novo lobby ao usuário
                        await linkLobbyToUser(userId, newLobby.$id);

                        return newLobby.$id; // Retorna o ID do lobby criado
                    } catch (error) {
                        console.error(`Erro ao processar o lobby com ID ${lobby.ID}:`, error);
                        return null; // Retorna null para lobbies que falharem
                    }
                });

                const createdBatchLobbyIds = await Promise.all(createdLobbyPromises);
                const filteredBatchLobbyIds = createdBatchLobbyIds.filter(id => id); // Filtra valores nulos ou inválidos
                createdLobbyIds.push(...filteredBatchLobbyIds);

                // Atraso de 1 segundo a cada 8 lobbies processados
                if (i + 8 < lobbies.length) {
                    console.log("Aguardando 1 segundo antes de continuar...");
                    await delay(200); // 2 millisegundos
                }
            }

            return createdLobbyIds;
        };

        // Chama a função para processar os lobbies em lotes
        const createdLobbyIds = await createLobbiesInBatches(lobbies);

        return createdLobbyIds; // Retorna os IDs dos lobbies criados
    } catch (error) {
        console.error("Erro geral ao criar e vincular lobbies:", error);
        throw new Error("Erro ao criar e vincular lobbies: " + error.message);
    }
};

const getFavouriteLobbysByUser = async (email) => {
    try {
        const lobbys = await getFavouriteLobbys(email);
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys favoritos: " + error.message);
    }
};

const getRegisteredLobbysByUser = async (email) => {
    try {
        const lobbys = await getRegisteredLobbys(email);
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys registrados: " + error.message);
    }
};

const getSkippedLobbysByUser = async (email) => {
    try {
        const lobbys = await getSkippedLobbys(email);
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys pulados: " + error.message);
    }
};

// Função para obter os lobbys excluídos de um usuário
const getDeletedLobbysByUser = async (email) => {
    try {
        const lobbys = await getDeletedLobbys(email);
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys excluídos: " + error.message);
    }
};

const updateLobbyStatus = async (email, id, state, value) => {
    try {
        const updatedLobby = await updateLobbyState(email, id, state, value);
        return updatedLobby;
    } catch (error) {
        throw new Error("Erro ao atualizar estado do lobby: " + error.message);
    }
};

const getAlarmLobbysByUser = async (email) => {
    try {
        const lobbys = await getAlarmLobbys(email);
        return lobbys;
    } catch (error) {
        throw new Error("Erro ao buscar lobbys com alarme: " + error.message);
    }
};

module.exports = {
    createNewLobby,
    getFavouriteLobbysByUser,
    getRegisteredLobbysByUser,
    getSkippedLobbysByUser,
    getDeletedLobbysByUser,
    updateLobbyStatus,
    getAlarmLobbysByUser,
    getLobbysByStates,
};
