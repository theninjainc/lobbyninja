import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite'; // Se ainda não estiver importado
import styles from "../main/main.module.css";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";
import poker888 from "../../assets/888poker.svg";
import siteWpn from "../../assets/wpn.svg";
import siteWinamax from "../../assets/siteWinamax.svg";
import sitePokerStars from "../../assets/sitePokerStars.svg";
import sitePartyPoker from "../../assets/sitePartyPoker.svg";
import siteiPoker from "../../assets/siteiPoker.svg";
import siteGGNetwork from "../../assets/siteGGNetwork.svg";
import siteChico from "../../assets/siteChico.svg";
import siteBodog from "../../assets/siteBodog.svg";

const Registered = () => {
    const siteData = [
        { network: "888Poker", image: poker888 },
        { network: "WPN", image: siteWpn },
        { network: "Winamax", image: siteWinamax },
        { network: "Winamax.fr", image: siteWinamax },
        { network: "PokerStars", image: sitePokerStars },
        { network: "PartyPoker", image: sitePartyPoker },
        { network: "iPoker", image: siteiPoker },
        { network: "GGNetwork", image: siteGGNetwork },
        { network: "Chico", image: siteChico },
        { network: "Bodog", image: siteBodog },
    ];
    const [email, setEmail] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [orderNameFilter, setOrderNameFilter] = useState("asc");

    // Função para buscar as lobbies registradas
    const fetchRegisteredLobbys = async (email, state) => {
        try {
            console.log(state); // Para verificar o estado
            const response = await fetch('https://ninja.lobby.ninja/apia/api/lobbys/lobbyAllOptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, // Enviar o e-mail no corpo da requisição
                    states: state, // Enviar o estado 'registered'
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();

            const updatedData = data.map(item => {
                const date = new Date(item.horarioInicio); // Converte para Date
                const dateEnd = new Date(item.horarioFim);
                const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const formattedTimeEnd = dateEnd.toTimeString().slice(0, 5); // Formata a hora e minuto
                return {
                    ...item,
                    horarioInicio: formattedTime, // Substitui o horário original pelo formato desejado
                    horarioFim: formattedTimeEnd, // Substitui o horário original pelo formato desejado
                };
            });

            setOrderList(updatedData); // Atualiza o estado com os dados obtidos
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
        }
    };

    const handleDelete = async (id, state, index) => {
        try {

            console.log(`Atualizando lobby para email: ${email}, ID: ${id}`);

            const apiUrl = 'https://ninja.lobby.ninja/apia/api/lobbys/lobbyUpdateOptions';
            const requestBody = JSON.stringify({
                email,
                id,
                state: state,
                value: false,
            });

            const response = await fetch(apiUrl, {
                method: 'PUT', // Método correto para update
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody, // Corpo da requisição
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura detalhes adicionais de erro
                throw new Error(`Erro ao atualizar lobby: ${errorData.message || 'Erro desconhecido'}`);
            }

            console.log(`Lobby com ID: ${id} foi atualizado com sucesso.`);

            // Caso a API retorne algo útil após o update, processamos aqui (opcional)
            const data = await response.json();
            if (index !== undefined)
                removeAlarm(index)
            console.log('Resposta da API:', data);
        } catch (error) {
            console.error("Erro ao atualizar lobby:", error);
            alert(`Erro ao atualizar lobby: ${error.message}`);
        }
    };

    // Função para obter o e-mail do usuário
    useEffect(() => {
        const getEmail = async () => {
            try {
                const client = new Client();
                const account = new Account(client);
                client.setProject('lobbyninja');
                const user = await account.get(); // Método do Appwrite
                console.log(user);
                setEmail(user.email); // Atualiza o estado com o e-mail
            } catch (error) {
                console.error("Erro ao obter o usuário:", error);
            }
        };

        getEmail(); // Chama a função para pegar o e-mail ao carregar a página
    }, []);

    // Carrega as lobbies registradas quando o e-mail estiver disponível
    useEffect(() => {
        if (email) {
            const state = 'skipped'; // Agora o estado é 'registered'
            fetchRegisteredLobbys(email, state); // Chama a função para carregar os dados
        }
    }, [email]);

    // Função para remover uma lobby
    const removeAlarm = (index) => {
        const updatedAlarms = orderList.filter((_, i) => i !== index);
        setOrderList(updatedAlarms);
    };

    // Função para ordenar a lista
    const orderedList = (key) => {
        const newList = [...orderList];
        newList.sort((a, b) =>
            orderNameFilter === "asc"
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key])
        );
        setOrderList(newList);
        setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
    };

    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <p className={styles.title}>Tournament skipped</p>
            </div>
            <div className={styles.filterbar}>
                <input type="checkbox" className={styles.filterCheckbox} />
                <button className={styles.filterSiteBtn}>Site</button>
                <button className={styles.filterStartBtn}>Start</button>
                <button className={styles.filterBuyInBtn}>Buy In</button>
                <button className={styles.filterNameBtn} onClick={() => orderedList('name')}>
                    Name
                </button>
                <button className={styles.filterPrizePoolBtn}>Prize Pool</button>
                <button className={styles.filterMaxReentryBtn}>Max Reentry</button>
                <button className={styles.filterBlindsBtn}>Blinds</button>
                <button className={styles.filterSpeedBtn}>Speed</button>
                <button className={styles.filterFieldBtn}>Field</button>
                <button className={styles.filterEndBtn}>End</button>
                <button className={styles.filterMlrBtn}>Mlr</button>
                <button className={styles.filterTableSizeBtn}>TableSize</button>
                <button className={styles.filterPriorityBtn}>Priority</button>
            </div>
            <table>
                <tbody>
                    {orderList.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor:
                                    index % 2 === 0
                                        ? "transparent"
                                        : "rgba(255, 255, 255, 0.05)",
                            }}
                        >
                            <td className={styles.stylesCheckboxTable}>
                                <div onClick={() => handleDelete(item.$id, 'favourite')}>
                                    <FavouriteStar
                                        className={styles.favouriteStar}
                                        favourites={true}
                                    />
                                </div>
                                <input type="checkbox" className={styles.checkBoxTable} />
                            </td>
                            <td className={styles.siteTable}>
                                <img src={
                                    siteData.find((site) => site.network === item.site).image
                                } alt="svg" />
                            </td>
                            <td className={styles.startTable}>{item.horarioInicio}</td>
                            <td className={styles.buyinTable}>{item.buyIn}</td>
                            <td className={styles.nameTable}>{item.nome}</td>
                            <td className={styles.prizepoolTable}>{item.premiacaoGarantida}</td>
                            <td className={styles.maxreentryTable}>{item.reentrada}</td>
                            <td className={styles.blindsTable}>{item.blindIntervalo}</td>
                            <td className={styles.speedTable}>{item.speedTable ?? "-"}</td>
                            <td className={styles.fieldTable}>{item.field ?? "-"}</td>
                            <td className={styles.endTable}>{item.horarioFim}</td>
                            <td className={styles.mlrTable}>{item.mlr ?? "-"}</td>
                            <td className={styles.tableSizeTableRegistered}>{item.tableSize ?? "-"}</td>
                            <td className={styles.priorityTableRegistered}>{item.priority ?? "-"}</td>
                            <td className={styles.deleteLinha}>
                                <div
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(item.$id, 'skipped', index)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Registered;
