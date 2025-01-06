import React, { useEffect, useState } from "react";
import { Client, Account } from 'appwrite';
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "./alarm.module.css";

const NotificationWithSound = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [alarms, setAlarms] = useState([]);
    const [email, setEmail] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const fetchAlarms = async (email, state) => {
        try {
            console.log(state);
            const response = await fetch('http://localhost:3000/api/lobbys/lobbyAllOptions', {
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
                throw new Error('Erro ao buscar os alarmes.');
            }

            const data = await response.json();
            console.log(data);

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

            setAlarms(updatedData);
        } catch (error) {
            console.error("Erro ao carregar alarmes:", error);
        }
    };

    const handleDelete = async (id, state, index) => {
        try {
            console.log(`Atualizando lobby para email: ${email}, ID: ${id}`);

            const apiUrl = 'http://localhost:3000/api/lobbys/lobbyUpdateOptions';
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
            if (index)
                removeAlarm(index);
            console.log('Resposta da API:', data);
        } catch (error) {
            console.error("Erro ao atualizar lobby:", error);
            alert(`Erro ao atualizar lobby: ${error.message}`);
        }
    };

    const removeAlarm = (index) => {
        const updatedAlarms = alarms.filter((_, i) => i !== index);
        setAlarms(updatedAlarms);
    };

    const orderedList = (key) => {
        const newList = [...alarms];
        newList.sort((a, b) =>
            orderNameFilter === "asc"
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key])
        );
        setAlarms(newList);
        setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
    };

    const requestNotificationPermission = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission !== "granted") {
                    console.warn("Permissão de notificação negada.");
                }
            });
        }
    };

    const triggerNotification = (alarm) => {
        if (Notification.permission === "granted") {
            const notification = new Notification(alarm.message, {
                body: alarm.body,
                icon: iconAlarm,
            });

            notification.onclick = () => {
                window.focus();
                stopAlarmSound();
                notification.close();
            };

            const alarmAudio = new Audio(AudioAlarm);
            alarmAudio.play();

            const stopAlarmSound = () => {
                alarmAudio.pause();
                alarmAudio.currentTime = 0;
            };
        } else {
            console.warn("Permissão de notificação negada ou indisponível.");
        }
    };

    const checkAlarms = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);

        alarms.forEach((alarm) => {
            if (alarm.time === currentTime) {
                triggerNotification(alarm);
            }
        });
    };

    useEffect(() => {
        const getEmail = async () => {
            try {
                const client = new Client();
                const account = new Account(client);
                client.setProject('lobbyninja');
                const user = await account.get();
                console.log(user);
                setEmail(user.email);  // Atualiza o estado com o e-mail
            } catch (error) {
                console.error("Erro ao obter o usuário:", error);
            }
        };

        getEmail();
    }, []);

    useEffect(() => {
        if (email) {
            requestNotificationPermission();
            const state = 'alarm';
            fetchAlarms(email, state);

            const id = setInterval(() => {
                checkAlarms();
            }, 60000);

            setIntervalId(id);

            return () => clearInterval(id);
        }
    }, [email]);


    return (
        <div className={styles.main}>
            <h1>Notificação com Alarme</h1>
            <div className={styles.filterbar}>
                <button
                    className={styles.filterSiteBtn}
                    onClick={() => orderedList("site")}
                >
                    Site
                </button>
                <button
                    className={styles.filterStartBtn}
                    onClick={() => orderedList("name")}
                >
                    Nome do campeonato
                </button>
                <button
                    className={styles.filterNameBtn}
                    onClick={() => orderedList("time")}
                >
                    Horário
                </button>
            </div>
            <table>
                <tbody>
                    <tr>
                        {alarms.map((item, index) => (
                            <div
                                key={index}
                                className={styles.linha}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? "transparent"
                                            : "rgba(255, 255, 255, 0.05)",
                                }}
                            >
                                <td className={styles.SiteBtn}>{item.site}</td>
                                <td className={styles.StartBtn}>{item.nome}</td>
                                <td className={styles.NameBtn}>{item.horarioInicio}</td>
                                <td className={styles.deleteLinha}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(item.$id, 'alarm', index)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </div>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NotificationWithSound;
