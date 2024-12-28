const lobbyService = require('../services/lobbyService');

const getFavouriteLobbysHandler = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "E-mail é obrigatório." });
        }

        const lobbys = await lobbyService.getFavouriteLobbys(email);
        res.status(200).json(lobbys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFavouriteLobbysHandler,
};
