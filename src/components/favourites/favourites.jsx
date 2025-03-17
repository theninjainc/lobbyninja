import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import styles from "../main/main.module.css"
import teste10 from "../../assets/image 9.svg";
import wpt from "../../assets/wpn.svg";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";

const Favourites = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [orderList, setOrderList] = useState([]);
    const [email, setEmail] = useState('');

    const handleDelete = async (id, state, index) => {
        try {
            console.log(`Atualizando lobby para email: ${email}, ID: ${id}`);

            const apiUrl = 'https://ninja.lobby.ninja/api/api/lobbys/lobbyUpdateOptions';
            const requestBody = {
                email,   // E-mail do usuário
                id,      // ID do lobby a ser atualizado
                state,   // Estado que está sendo removido
                value: false, // Define como não-favorito
            };

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody), // Corpo da requisição
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro desconhecido');
            }

            console.log(`Lobby com ID: ${id} foi atualizado com sucesso.`);

            // Remove o item localmente da lista após confirmação do sucesso
            setOrderList((prevOrderList) =>
                prevOrderList.filter((_, i) => i !== index)
            );
        } catch (error) {
            console.error("Erro ao atualizar lobby:", error);
            alert(`Erro ao atualizar lobby: ${error.message}`);
        }
    };

    // Função para buscar dados da API
    const fetchFavouriteLobbys = async (email, state) => {
        try {
            console.log(state)
            const response = await fetch('https://ninja.lobby.ninja/api/api/lobbys/lobbyAllOptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Adicione o token ou outras informações se necessário
                },
                body: JSON.stringify({
                    email: email, // Enviar o e-mail no corpo da requisição
                    states: state, // Enviar o estado 'favourite'
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();

            const updatedData = data.map(item => {
                const date = new Date(item.horarioInicio); // Converte para Date
                const dateEnd = new Date(item.horarioFim); // Converte para Date
                const formattedTime = date.toTimeString().slice(0, 5); // Formata a hora e minuto
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

    useEffect(() => {
        // Pega o e-mail do usuário autenticado no Appwrite
        const getEmail = async () => {
            try {
                const client = new Client();
                const account = new Account(client);
                client
                    .setProject('lobbyninja');
                const user = await account.get(); // Método do Appwrite
                console.log(user)
                setEmail(user.email); // Atualiza o estado com o e-mail
            } catch (error) {
                console.error("Erro ao obter o usuário:", error);
            }
        };

        getEmail(); // Chama a função para pegar o e-mail ao carregar a página
    }, []);

    useEffect(() => {
        if (email) {
            const state = 'favourite'; // Aqui é só o estado 'favourite'
            fetchFavouriteLobbys(email, state); // Chama a função para carregar os dados quando o e-mail estiver disponível
        }
    }, [email]); // Chama sempre que o e-mail mudar

    const removeAlarm = (index) => {
        const updatedAlarms = orderList.filter((_, i) => i !== index);
        setOrderList(updatedAlarms);
    };

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
                <p className={styles.title}>Tournament favorites</p>
            </div>
            <div className={styles.filterbar}>
                <input type="checkbox" className={styles.filterCheckbox} />
                <button className={styles.filterSiteBtn}>Site</button>
                <button className={styles.filterStartBtn}>Start</button>
                <button className={styles.filterBuyInBtn}>Buy In</button>
                <button className={styles.filterNameBtn} onClick={orderedList}>
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
                    <tr>
                        {orderList.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? "transparent"
                                            : "rgba(255, 255, 255, 0.05)",
                                }}
                            >
                                <td className={styles.stylesCheckboxTable}>
                                    <div onClick={() => handleDelete(item.$id, 'favourite', index)}>
                                        <FavouriteStar
                                            className={styles.favouriteStar}
                                            favourites={true}
                                        />
                                    </div>
                                    <input type="checkbox" className={styles.checkBoxTable} />
                                </td>
                                <td className={styles.siteTable}>
                                    <img src={item.site == 2 ? wpt : teste10} alt="svg" />
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
                            </div>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Favourites;
