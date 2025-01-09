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
        
        console.log("OIIIIIIIIIIIIIIIIIIIIII", lobbies)
        const createdLobbyPromises = lobbies.map(async (lobby) => {
            console.log("Lobby sendo processado:", lobby);
            try {
                const {
                    ID,
                    Site, // 'Site' é o campo do lobby
                    Start: horarioInicio, // 'Start' do lobby é mapeado para 'horarioInicio'
                    End: horarioFim, // 'End' do lobby é mapeado para 'horarioFim'
                    Name: nome, // 'Name' do lobby é mapeado para 'nome'
                    BuyIn: buyIn, // 'BuyIn' do lobby é mapeado para 'buyIn'
                    PrizePool: premiacaoGarantida, // 'PrizePool' do lobby é mapeado para 'premiacaoGarantida'
                    MaxReentry: reentrada, // 'MaxReentry' do lobby é mapeado para 'reentrada'
                    Blinds: blindIntervalo, // 'Blinds' do lobby é mapeado para 'blindIntervalo'
                    Field: jogadoresInscritos, // 'Field' do lobby é mapeado para 'jogadoresInscritos'
                    TableSize: jogadoresMesa, // 'TableSize' do lobby é mapeado para 'jogadoresMesa'
                    Mlr: jogadoresJogando, // 'Mlr' do lobby é mapeado para 'jogadoresJogando'
                    bounty,
                    fichasIniciais,
                    apostaForcada,
                    skipped,
                    deleted,
                    favourite,
                    registered,
                    alarm
                } = lobby;


                console.log("OOOOOOOOOOadadadadaIIII", Site, horarioInicio, horarioFim, nome, buyIn, premiacaoGarantida, reentrada, blindIntervalo, jogadoresInscritos, jogadoresMesa, jogadoresJogando, bounty, fichasIniciais, apostaForcada, skipped, deleted, favourite, registered, alarm);

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
                    alarm
                );
                console.log(userId, newLobby.$id)
                await linkLobbyToUser(userId, newLobby.$id);

                return newLobby.$id;
            } catch (error) {
                console.error(`Erro ao processar o lobby: ${lobby.nome}`, error);
                return null;
            }
        });

        const createdLobbyIds = await Promise.all(createdLobbyPromises);
        console.log("Lobbies criados e vinculados com sucesso:", createdLobbyIds.filter(id => id));

        return createdLobbyIds.filter(id => id); // Filtra IDs nulos ou inválidos
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
