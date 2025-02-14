const lobbyService = require('../services/lobbyService');

const getLobbysHandler = async (req, res) => {
    try {
        const { email, states } = req.body;

        console.log(email, states)
        if (!email) {
            return res.status(400).json({ error: "E-mail é obrigatório." });
        }

        const validStates = states ? [states] : ['favourite', 'registered', 'skipped', 'deleted', 'alarm'];

        const lobbys = await lobbyService.getLobbysByStates(email, validStates);
        res.status(200).json(lobbys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStateHandler = async (req, res) => {
    try {
        const { email, id, state, value } = req.body;
        console.log(email, id, state, value)
        // Validações básicas
        if (!email) {
            return res.status(400).json({ error: "Email é obrigatório." });
        }
        if (!id) {
            return res.status(400).json({ error: "ID do lobby é obrigatório." });
        }

        if (!state) {
            return res.status(400).json({ error: "O estado a ser atualizado é obrigatório." });
        }

        if (typeof value !== 'boolean') {
            return res.status(400).json({ error: "O valor deve ser true ou false." });
        }

        // Atualiza o estado usando o serviço
        const updatedLobby = await lobbyService.updateLobbyStatus(email, id, state, value);

        if (!updatedLobby) {
            return res.status(404).json({ error: "Lobby não encontrado." });
        }

        res.status(200).json({ message: "Estado atualizado com sucesso!", lobby: updatedLobby });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createLobbyHandler = async (req, res) => {
    try {
        const { email, lobbies } = req.body;
        // Verificações de parâmetros
        if (!email) {
            return res.status(400).json({ error: "O email é obrigatório." });
        }

        if (!Array.isArray(lobbies) || lobbies.length === 0) {
            return res.status(400).json({ error: "A lista de lobbies é obrigatória e deve conter itens." });
        }

        // Chamada ao serviço para criar os lobbies
        const createdLobbies = await lobbyService.createNewLobby(email, lobbies);

        // Caso nenhum lobby tenha sido criado, retornar erro
        if (!createdLobbies || createdLobbies.length === 0) {
            return res.status(500).json({ error: "Erro ao criar os lobbies." });
        }

        // Resposta de sucesso
        res.status(201).json({
            message: `${createdLobbies.length} lobbies criados com sucesso!`,
            lobbies: createdLobbies,
        });
    } catch (error) {
        // Retorna erro para falhas no processo
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getLobbysHandler,
    updateStateHandler,
    createLobbyHandler,
};
