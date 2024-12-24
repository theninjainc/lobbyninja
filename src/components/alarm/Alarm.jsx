import React, { useEffect, useState } from 'react';
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "./alarm.module.css"

const NotificationWithSound = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [alarms, setAlarms] = useState([
        {
            time: "10:09",
            message: "⏰ Hora de agir!",
            body: "Seu alarme está tocando agora!",
            site: "Site A",
            name: "Alarme 1",
            championship: "Campeonato X"
        },
        {
            time: "10:08",
            message: "Alarme 2",
            body: "Outro horário",
            site: "Site B",
            name: "Alarme 2",
            championship: "Campeonato Y"
        }
    ]);

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
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission !== 'granted') {
                    console.warn("Permissão de notificação negada.");
                }
            });
        }
    };

    const triggerNotification = (alarm) => {
        if (Notification.permission === 'granted') {
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

        const interval = setInterval(() => {
            checkAlarms();
        }, 60000);

        return () => clearInterval(interval);
    }, [alarms]);

    return (
        <div className={styles.main}>
            <h1>Notificação com Alarme</h1>
            <p>Alarme configurado para: {alarms.map((a) => a.time).join(", ")}</p>
            <button onClick={() => triggerNotification(alarms[0])} style={{ fontSize: '16px' }}>
                Testar Notificação
            </button>
            <div className={styles.filterbar}>
                <button className={styles.filterSiteBtn} onClick={() => orderedList('site')}>Site</button>
                <button className={styles.filterStartBtn} onClick={() => orderedList('name')}>Nome do alarme</button>
                <button className={styles.filterBuyInBtn} onClick={() => orderedList('championship')}>Nome do campeonato</button>
                <button className={styles.filterNameBtn} onClick={() => orderedList('time')}>Horário</button>
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
                                <td className={styles.StartBtn}>{item.name}</td>
                                <td className={styles.BuyInBtn}>{item.championship}</td>
                                <td className={styles.NameBtn}>{item.time}</td>
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

