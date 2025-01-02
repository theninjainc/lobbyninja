const express = require('express');
const axios = require('axios');
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
} = require('../controllers/torneioController');

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
        'Winamax'
    ];

    const url = 'https://pt.sharkscope.com/api/roots/networks';
    const headers = {
        'Username': 'jmarcel@live.com',
        'Password': '5ef3ffc6a7eea165133636e1999c0b66',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
    };

    try {
        const results = await Promise.all(
            networks.map(async (network) => {
                try {
                    const response = await axios.get(`${url}/${network}/activeTournaments?filter=Type:H,NL;Type!:SAT,HU,FPP,TI,TR,SO,DN,TN,W,C,RH,L;Class:SCHEDULED`, { headers });

                    if (response.data.Response.RegisteringTournamentsResponse && response.data.Response.RegisteringTournamentsResponse.RegisteringTournaments) {
                        return response.data.Response.RegisteringTournamentsResponse.RegisteringTournaments.RegisteringTournament
                            .map(tournament => {
                                const tournamentStart = new Date(parseInt(tournament["@scheduledStartDate"]) * 1000);
                                const today = new Date();
                                const sameDay = tournamentStart.getDate() === today.getDate() &&
                                    tournamentStart.getMonth() === today.getMonth() &&
                                    tournamentStart.getFullYear() === today.getFullYear();

                                if (sameDay) {
                                    const buyIn = parseFloat(tournament["@stake"]) + parseFloat(tournament["@rake"]);
                                    return {
                                        Site: tournament["@network"],
                                        Start: tournamentStart.toLocaleString(),
                                        BuyIn: `${buyIn.toFixed(2)} USD`,
                                        Name: tournament["@name"],
                                        PrizePool: tournament["@guarantee"],
                                        MaxReentry: tournament["@flags"]?.includes("R") ? "Yes" : "No",
                                        Blinds: tournament["@structure"],
                                        Speed: null,
                                        Field: tournament["@totalEntrants"],
                                        End: null,
                                        Mlr: null,
                                        TableSize: tournament["@playersPerTable"],
                                        Priority: null
                                    };
                                }
                                return null;
                            })
                            .filter(tournament => tournament !== null);
                    } else {
                        return [];
                    }
                } catch {
                    return [];
                }
            })
        );

        const allTournaments = results.flat();
        res.status(200).json(allTournaments);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar torneios. Tente novamente mais tarde.' });
    }
});

module.exports = router;
