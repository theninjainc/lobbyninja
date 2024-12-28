import React, { useEffect, useState } from 'react';
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "../main/main.module.css"
import teste10 from "../../assets/image 9.svg"
import wpt from "../../assets/image 1.svg";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";

const Favourites = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [orderList, setOrderList] = useState([]);

    // Função para buscar dados da API
    const fetchFavouriteLobbys = async () => {
        try {
            const email = "usuario@exemplo.com";
            const response = await fetch('http://localhost:3000/api/lobbys/favourite', {
                method: 'POST', // ou 'POST' se for o caso
                headers: {
                    'Content-Type': 'application/json',
                    // Adicione o token ou outras informações se necessário
                },
                body: JSON.stringify({
                    email: email, // Enviar o e-mail no corpo da requisição
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
        fetchFavouriteLobbys(); // Chama a função para carregar os dados
    }, []); // O array vazio [] garante que a requisição seja feita apenas uma vez

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
                <p className={styles.title}>Tournament favourites</p>
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
                                    <FavouriteStar className={styles.favouriteStar} favourites={true} />
                                    <input type="checkbox" className={styles.checkBoxTable} />
                                </td>
                                <td className={styles.siteTable}>
                                    <img src={item.site == 2 ? wpt : teste10} alt="svg" />
                                </td>
                                <td className={styles.startTable}>{item.horarioInicio}</td>
                                <td className={styles.buyInTable}>{item.buyIn}</td>
                                <td className={styles.nameTable}>{item.nome}</td>
                                <td className={styles.prizePoolTable}>{item.premiacaoGarantida}</td>
                                <td className={styles.maxReentryTable}>{item.reentrada}</td>
                                <td className={styles.blindsTable}>{item.blindIntervalo}</td>
                                <td className={styles.speedTable}>{item.speedTable ?? "-"}</td>
                                <td className={styles.fieldTable}>{item.field ?? "-"}</td>
                                <td className={styles.endTable}>{item.horarioFim}</td>
                                <td className={styles.mlrTable}>{item.mlr ?? "-"}</td>
                                <td className={styles.tableSizeTable}>{item.tableSize ?? "-"}</td>
                                <td className={styles.priorityTable}>{item.priority ?? "-"}</td>
                            </div>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Favourites;
