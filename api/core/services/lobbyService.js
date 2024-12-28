const lobbyRepository = require('../repositories/lobbyRepository');

const getFavouriteLobbys = async (email) => {
    return await lobbyRepository.getFavouriteLobbys(email);
};

module.exports = { getFavouriteLobbys };
