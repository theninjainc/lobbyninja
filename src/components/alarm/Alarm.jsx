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
            const response = await fetch('https://lobby.ninja/api/api/alarmes/');


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

    const handleDelete = async (id, index) => {
        const removedAlarm = alarms[index];
        try {
            console.log(`Deletando alarme ID: ${id}`);

            // Remove visualmente o alarme antes da confirmação da API
            removeAlarm(index);

            const response = await fetch(`https://lobby.ninja/api/api/alarmes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar alarme: ${response.statusText}`);
            }

            console.log(`Alarme com ID: ${id} deletado com sucesso.`);
        } catch (error) {
            console.error("Erro ao deletar alarme:", error);
            alert(`Erro ao deletar alarme: ${error.message}`);

            // Re-adiciona o alarme à lista caso a API falhe
            alarms.splice(index, 0, removedAlarm);
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
                    Name Alarm
                </button>
                <button
                    className={styles.filterSiteBtn}
                    onClick={() => orderedList("time")}
                >
                    Hour
                </button>
                <button
                    className={styles.filterDaysBtn}
                    onClick={() => orderedList("time")}
                >
                    Days
                </button>
                <button
                    className={styles.filterCommentBtn}
                    onClick={() => orderedList("name")}
                >
                    Comment
                </button>
                <button
                    className={styles.filterSiteBtn}
                >
                    Actions
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
                                <td className={styles.initialTable}></td>
                                <td className={styles.siteTable}>{item.nome}</td>
                                <td className={styles.nameTable}>
                                    {new Date(item.horaAlarme).toUTCString().slice(17, 22)}
                                </td>
                                <td className={styles.siteTable}>
                                    {item.dias.join(', ')}
                                </td>
                                <td className={styles.commentTable}>{item.comentario}</td>
                                <td className={styles.deleteLinha}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(item.$id, index)}
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
