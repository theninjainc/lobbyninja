const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
} = require('../controllers/torneioController');
const {
    getLobbysByState,
} = require('../repositories/lobbyRepository'); // Importe o serviço com `getLobbysByState`

const router = express.Router();

router.get('/', getAllTorneiosHandler);
router.post('/', createTorneioHandler);
router.get('/:id', getTorneioByIdHandler);
router.put('/:id', updateTorneioHandler);
router.delete('/:id', deleteTorneioHandler);

router.get('/api/activeTournaments', async (req, res) => {
    const networks = [
        '888Poker',
        'PokerStars',
        'PartyPoker',
        'iPoker',
        'GGNetwork',
        'Chico',
        'Bodog',
        'WPN',
        'Winamax',
    ];

    const url = 'https://pt.sharkscope.com/api/roots/networks';
    const headers = {
        'Username': 'jmarcel@live.com',
        'Password': '5ef3ffc6a7eea165133636e1999c0b66',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
    };

    try {
        // Busca os lobbys do usuário para todos os estados
        const email = "usuario@exemplo.com"; // Supondo que o email seja passado na query string
        const states = ['favourite', 'registered', 'skipped', 'deleted', 'alarm'];

        const allLobbys = (
            await Promise.all(states.map((state) => getLobbysByState(email, state)))
        ).flat();

        // Extrai apenas os IDs dos lobbys
        const lobbyIds = allLobbys.map((lobby) => lobby.$id);

        const results = await Promise.all(
            networks.map(async (network) => {
                try {
                    const response = await axios.get(`${url}/${network}/activeTournaments?filter=Type:H,NL;Type!:SAT,HU,FPP,TI,TR,SO,DN,TN,W,C,RH,L;Class:SCHEDULED`, { headers });
                    if (response.data.Response.RegisteringTournamentsResponse && response.data.Response.RegisteringTournamentsResponse.RegisteringTournaments) {
                        return response.data.Response.RegisteringTournamentsResponse.RegisteringTournaments.RegisteringTournament
                            .map((tournament) => {
                                const tournamentStart = new Date(parseInt(tournament["@scheduledStartDate"]) * 1000);
                                const today = new Date();
                                const isSameDate = tournamentStart.toDateString() === today.toDateString();
                                if (isSameDate && tournamentStart >= today) {
                                    const buyIn = parseInt(tournament["@stake"]) + parseInt(tournament["@rake"]);
                                    const prizePool = parseInt(tournament["@guarantee"]);

                                    const hash = crypto.createHash('md5');
                                    const idString = `${tournament["@name"]}-${tournament["@network"]}-${tournamentStart}`;
                                    const id = hash.update(idString).digest('hex');
                                    return {
                                        ID: id,
                                        Site: tournament["@network"],
                                        Start: tournamentStart.toLocaleString(),
                                        BuyIn: `${buyIn}`,
                                        Name: tournament["@name"],
                                        PrizePool: prizePool,
                                        MaxReentry: tournament["@flags"]?.includes("R") ? "Yes" : "No",
                                        Blinds: tournament["@structure"],
                                        Speed: null,
                                        Field: tournament["@totalEntrants"],
                                        End: null,
                                        Mlr: null,
                                        TableSize: tournament["@playersPerTable"],
                                        Priority: states.includes('favourite') && lobbyIds.includes(id) ? 1 : 2, // Prioridade para favoritos
                                    };
                                }
                                return null;
                            })
                            .filter((tournament) => tournament !== null);
                    } else {
                        return [];
                    }
                } catch {
                    return [];
                }
            })
        );

        const allTournaments = results.flat();

        // Filtrar torneios que já estão nos lobbys
        const filteredTournaments = allTournaments.filter((tournament) => !lobbyIds.includes(tournament.ID));

        // Ordenar por prioridade (favoritos primeiro)
        filteredTournaments.sort((a, b) => a.Priority - b.Priority);

        res.status(200).json(filteredTournaments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar torneios. Tente novamente mais tarde.' });
    }
});

module.exports = router;
