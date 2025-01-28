const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const {
    getAllTorneiosHandler,
    createTorneioHandler,
    getTorneioByIdHandler,
    updateTorneioHandler,
    deleteTorneioHandler,
    saveFilter,
    applyFilter,
} = require("../controllers/torneioController");
const { getLobbysGeral } = require("../repositories/lobbyRepository");

const router = express.Router();

router.get("/", getAllTorneiosHandler);
router.post("/", createTorneioHandler);
router.get("/:id", getTorneioByIdHandler);
router.put("/:id", updateTorneioHandler);
router.delete("/:id", deleteTorneioHandler);
router.post("/save", saveFilter);
router.post("/apply", applyFilter);

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
                await Promise.all(states.map((state) => getLobbysGeral(email, state)))
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

        const processTournaments = (tournamentsData, lobbys) => {
            const today = new Date();
            const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

            console.log(tournamentsData);

            return tournamentsData
                .map((tournament) => {
                    const tournamentStartTimestamp = parseInt(tournament["@scheduledStartDate"]) * 1000;
                    const tournamentStart = new Date(tournamentStartTimestamp);

                    // Criar a data UTC para o torneio
                    const tournamentStartUTC = new Date(Date.UTC(
                        tournamentStart.getUTCFullYear(),
                        tournamentStart.getUTCMonth(),
                        tournamentStart.getUTCDate(),
                        tournamentStart.getUTCHours(),
                        tournamentStart.getUTCMinutes(),
                        tournamentStart.getUTCSeconds()
                    ));

                    // Criar o horário UTC atual explicitamente
                    const nowUTC = new Date(Date.UTC(
                        today.getUTCFullYear(),
                        today.getUTCMonth(),
                        today.getUTCDate(),
                        today.getUTCHours(),
                        today.getUTCMinutes(),
                        today.getUTCSeconds()
                    ));

                    // Comparação considerando o horário UTC
                    if (
                        tournamentStartUTC.toDateString() !== nowUTC.toDateString() || // Data diferente de hoje (UTC)
                        tournamentStartUTC <= nowUTC // Horário do torneio é menor ou igual ao atual (UTC)
                    ) {
                        return null;
                    }


                    // Calcular Buy-In e Prize Pool
                    const buyIn = parseFloat(tournament["@stake"]) + parseFloat(tournament["@rake"]);
                    const prizePool = (tournament["@guarantee"]);

                    // Gerar hash para ID único
                    const hash = crypto.createHash("md5");
                    const idString = `${tournament["@name"]}-${tournament["@network"]}-${tournamentStart.toUTCString()}`;
                    const id = hash.update(idString).digest("hex");

                    const teste = lobbys.find((lobby) => lobby.$id == "2ed8a0c12eddf41a6b8392b42adaa975");
                    if (teste)
                        console.log("Tem!")

                    const matchedLobby = lobbys.find((lobby) => lobby.$id == id);
                    if (matchedLobby) {
                        console.log("PQ VC ESTÁ RINDO?", matchedLobby.priority);
                    }
                    return {
                        ID: id,
                        Site: tournament["@network"],
                        Start: tournamentStart.toUTCString(),
                        BuyIn: `${buyIn.toFixed(2)}`,
                        Name: tournament["@name"],
                        PrizePool: prizePool,
                        MaxReentry: tournament["@flags"]?.includes("R") ? "Yes" : "No",
                        Speed: (() => {
                            const filterString = tournament["@filterString"];
                            const type = filterString?.match(/Type:([^;]+)/)?.[1]; // Extrai o valor após "Type:"

                            if (type) {
                                // Verifica o valor de "Type" e atribui o valor correspondente a Speed
                                if (type.includes("ST")) {
                                    return 4;
                                } else if (type.includes("T")) {
                                    return 3;
                                } else if (type.includes("D")) {
                                    return 1;
                                } else {
                                    return 2;
                                }
                            }

                            return 2; // Valor padrão caso "Type" não esteja presente
                        })(),
                        Field: tournament["@totalEntrants"],
                        End: null,
                        Mlr: null,
                        TableSize: tournament["@playersPerTable"],
                        Priority: matchedLobby?.priority || null,
                    };
                })
                .filter(Boolean);
        };

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
        const lobbysWithPriority = lobbys.filter((lobby) => lobby.priority > 0);

        console.log(`Número de lobbys com prioridade: ${lobbysWithPriority.length}`);

        const tournamentsPromises = networks.map(async (network) => {
            const tournamentsData = await fetchTournaments(network);
            return processTournaments(tournamentsData, lobbys);
        });

        const allTournaments = (await Promise.all(tournamentsPromises)).flat();

        const filteredTournaments = allTournaments.filter(
            (tournament) => !lobbyIds.has(tournament.ID)
        );

        const tournamentsWithPriority = filteredTournaments.filter(
            (tournament) => tournament.Priority != null
        );

        console.log(
            `Torneios com prioridade encontrados: ${tournamentsWithPriority.length}`
        );

        filteredTournaments.sort((a, b) => (a.Priority || Infinity) - (b.Priority || Infinity));

        res.status(200).json(filteredTournaments);
    } catch (error) {
        console.error("Erro geral ao buscar torneios:", error.message);
        res.status(500).json({ error: "Erro ao buscar torneios. Tente novamente mais tarde." });
    }
});

module.exports = router;
