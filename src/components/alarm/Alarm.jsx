import React, { useEffect, useState } from "react";
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "./alarm.module.css";

const NotificationWithSound = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [alarms, setAlarms] = useState([]);

    const fetchAlarms = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/alarmes");
            if (!response.ok) {
                throw new Error("Erro ao buscar os alarmes.");
            }
            const data = await response.json();

            console.log(data)
            setAlarms(data);
        } catch (error) {
            console.error("Erro ao carregar alarmes:", error);
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
        requestNotificationPermission();
        fetchAlarms(); // Executa apenas uma vez para carregar os alarmes iniciais

        const interval = setInterval(() => {
            checkAlarms(); // Apenas verifica alarmes já carregados
        }, 60000); // Executa a cada minuto

        return () => clearInterval(interval);
    }, []);

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
                                <td className={styles.NameBtn}>{item.horaAlarme}</td>
                                <td className={styles.deleteLinha}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => removeAlarm(index)}
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
