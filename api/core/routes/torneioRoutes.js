/* eslint-disable no-undef */
const express = require('express');
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
} = require('../controllers/torneioController');
const axios = require('axios')

const router = express.Router();
router.get('/', getAllTorneiosHandler);
router.post('/', createTorneioHandler);
router.get('/:id', getTorneioByIdHandler);
router.put('/:id', updateTorneioHandler);
router.delete('/:id', deleteTorneioHandler);

router.get('/api/activeTournaments', async (req, res) => {
    try {
        console.log("OOOOI")
        const response = await axios.get('https://pt.sharkscope.com/api/roots/networks/888Poker/activeTournaments?filter=Type:H,NL;Type!:SAT,HU,FPP,TI,TR,SO,DN,TN,W,C,RH,L;Class:SCHEDULED', {
            headers: {
                'Username': 'jmarcel@live.com',
                'Password': '5ef3ffc6a7eea165133636e1999c0b66',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
