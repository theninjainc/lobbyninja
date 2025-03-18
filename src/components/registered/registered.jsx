import React, { useEffect, useState } from 'react';
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "../main/main.module.css";
import teste10 from "../../assets/image 9.svg";
import teste2 from "../../assets/wpn.svg";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";
import { Client, Account } from 'appwrite';
import wpt from "../../assets/wpn.svg";

const Registered = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [orderList, setOrderList] = useState([]);
    const [email, setEmail] = useState("");

    const fetchRegisteredLobbys = async (email, state) => {
        try {
            console.log(state);
            const response = await fetch('https://lobby.ninja/api/api/lobbys/lobbyAllOptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    states: state,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();

            const updatedData = data.map(item => {
                const date = new Date(item.horarioInicio);
                const dateEnd = new Date(item.horarioFim);
                const formattedTime = date.toTimeString().slice(0, 5);
                const formattedTimeEnd = dateEnd.toTimeString().slice(0, 5);
                return {
                    ...item,
                    horarioInicio: formattedTime,
                    horarioFim: formattedTimeEnd,
                };
            });

            setOrderList(updatedData);
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
        }
    };

    const handleDelete = async (id, state, index) => {
        try {

            console.log(`Atualizando lobby para email: ${email}, ID: ${id}`);

            const apiUrl = 'https://lobby.ninja/api/api/lobbys/lobbyUpdateOptions';
            const requestBody = JSON.stringify({
                email,
                id,
                state: state,
                value: false,
            });

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao atualizar lobby: ${errorData.message || 'Erro desconhecido'}`);
            }

            console.log(`Lobby com ID: ${id} foi atualizado com sucesso.`);

            const data = await response.json();

            if (index !== undefined) {
                removeAlarm(index);
            }

            console.log('Resposta da API:', data);
        } catch (error) {
            console.error("Erro ao atualizar lobby:", error);
            alert(`Erro ao atualizar lobby: ${error.message}`);
        }
    };

    useEffect(() => {
        const getEmail = async () => {
            try {
                const client = new Client();
                const account = new Account(client);
                client.setProject('lobbyninja');
                const user = await account.get();
                console.log(user);
                setEmail(user.email);
            } catch (error) {
                console.error("Erro ao obter o usuário:", error);
            }
        };

        getEmail();
    }, []);

    useEffect(() => {
        if (email) {
            const state = 'registered';
            fetchRegisteredLobbys(email, state);
        }
    }, [email]);

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
                <p className={styles.title}>Tournament registered</p>
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
                                <img src={item.site == 2 ? wpt : teste10} alt="svg" />
                            </td>
                            <td className={styles.startTable}>{item.horarioInicio ?? "-"}</td>
                            <td className={styles.buyinTable}>{item.buyIn ?? "-"}</td>
                            <td className={styles.nameTable}>{item.nome ?? "-"}</td>
                            <td className={styles.prizepoolTable}>{item.premiacaoGarantida ?? "-"}</td>
                            <td className={styles.maxreentryTable}>{item.reentrada ?? "-"}</td>
                            <td className={styles.blindsTable}>{item.blindIntervalo ?? "-"}</td>
                            <td className={styles.speedTable}>{item.speedTable ?? "-"}</td>
                            <td className={styles.fieldTable}>{item.field ?? "-"}</td>
                            <td className={styles.endTable}>{item.horarioFim}</td>
                            <td className={styles.mlrTable}>{item.mlr ?? "-"}</td>
                            <td className={styles.tableSizeTableRegistered}>{item.tableSize ?? "-"}</td>
                            <td className={styles.priorityTableRegistered}>{item.priority ?? "-"}</td>
                            <td className={styles.deleteLinha}>
                                <div
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(item.$id, 'registered', index)}
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
