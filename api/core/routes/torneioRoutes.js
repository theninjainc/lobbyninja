const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
} = require("../controllers/torneioController");
const { getLobbysByState } = require("../repositories/lobbyRepository");

const router = express.Router();

router.get("/", getAllTorneiosHandler);
router.post("/", createTorneioHandler);
router.get("/:id", getTorneioByIdHandler);
router.put("/:id", updateTorneioHandler);
router.delete("/:id", deleteTorneioHandler);

router.get("/api/activeTournaments", async (req, res) => {
    const networks = [
        "888Poker",
        "PokerStars",
        "PartyPoker",
        "iPoker",
        "GGNetwork",
        "Chico",
        "Bodog",
        "WPN",
        "Winamax",
    ];

    const apiConfig = {
        url: "https://pt.sharkscope.com/api/roots/networks",
        headers: {
            Username: "jmarcel@live.com",
            Password: "5ef3ffc6a7eea165133636e1999c0b66",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0",
        },
    };

    try {
        const email = "usuario@exemplo.com";
        const states = ["favourite", "registered", "skipped", "deleted", "alarm"];

        // Função para carregar lobbys por estados
        const loadLobbys = async () => {
            const lobbys = (
                await Promise.all(states.map((state) => getLobbysByState(email, state)))
            ).flat();
            return lobbys;
        };

        // Função para buscar torneios por rede
        const fetchTournaments = async (network) => {
            try {
                const response = await axios.get(
                    `${apiConfig.url}/${network}/activeTournaments?filter=Type:H,NL;Type!:SAT,HU,FPP,TI,TR,SO,DN,TN,W,C,RH,L;Class:SCHEDULED`,
                    { headers: apiConfig.headers }
                );

                return (
                    response.data.Response?.RegisteringTournamentsResponse?.RegisteringTournaments
                        ?.RegisteringTournament || []
                );
            } catch (error) {
                console.error(`Erro ao buscar torneios para a rede ${network}:`, error.message);
                return [];
            }
        };

        // Função para processar torneios e adicionar informações
        const processTournaments = (tournamentsData, lobbys) => {
            const today = new Date();

            return tournamentsData
                .map((tournament) => {
                    const tournamentStart = new Date(
                        parseInt(tournament["@scheduledStartDate"]) * 1000
                    );

                    if (
                        tournamentStart.toDateString() !== today.toDateString() ||
                        tournamentStart < today
                    ) {
                        return null;
                    }

                    const buyIn = parseInt(tournament["@stake"]) + parseInt(tournament["@rake"]);
                    const prizePool = parseInt(tournament["@guarantee"]);

                    const hash = crypto.createHash("md5");
                    const idString = `${tournament["@name"]}-${tournament["@network"]}-${tournamentStart}`;
                    const id = hash.update(idString).digest("hex");
                    if (lobbys.find((lobby) => lobby.$id === id))
                        console.log(lobbys.find((lobby) => lobby.$id == id)?.priority)
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
                        Priority: lobbys.find((lobby) => lobby.$id == id)?.priority || null,
                    };
                })
                .filter(Boolean);
        };

        // Carregar lobbys e torneios
        const lobbys = await loadLobbys();
        const lobbyIds = new Set(
            lobbys
                .filter((lobby) =>
                    lobby.favourite ||
                    lobby.registered ||
                    lobby.skipped ||
                    lobby.deleted ||
                    lobby.alarm
                )
                .map((lobby) => lobby.$id)
        );
        const lobbysWithPriority = lobbys.filter((lobby) => lobby.priority != null);

        console.log(`Número de lobbys com prioridade: ${lobbysWithPriority.length}`);

        const tournamentsPromises = networks.map(async (network) => {
            const tournamentsData = await fetchTournaments(network);
            return processTournaments(tournamentsData, lobbys);
        });

        const allTournaments = (await Promise.all(tournamentsPromises)).flat();

        // Remover torneios já registrados nos lobbys
        const filteredTournaments = allTournaments.filter(
            (tournament) => !lobbyIds.has(tournament.ID)
        );

        // Adicionar torneios com prioridade
        const tournamentsWithPriority = filteredTournaments.filter(
            (tournament) => tournament.Priority != null
        );

        console.log(
            `Torneios com prioridade encontrados: ${tournamentsWithPriority.length}`
        );

        // Ordenar por prioridade
        filteredTournaments.sort((a, b) => (a.Priority || Infinity) - (b.Priority || Infinity));

        res.status(200).json(filteredTournaments);
    } catch (error) {
        console.error("Erro geral ao buscar torneios:", error.message);
        res.status(500).json({ error: "Erro ao buscar torneios. Tente novamente mais tarde." });
    }
});

module.exports = router;
