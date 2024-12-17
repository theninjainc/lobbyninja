import React, { useEffect, useState, useRef } from 'react';
import Mp3 from "../../assets/alarm.mp3";
import styles from "./alarm.module.css"; // Agora importando o CSS

const alarmsData = [
    { id: 1, time: "02:31", date: "2024-12-17", active: true },
    { id: 2, time: "16:00", date: "2024-12-16", active: false },
];

function App() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [alarms, setAlarms] = useState(alarmsData);
    const [triggeredAlarms, setTriggeredAlarms] = useState([]);
    const [activeAlarmModal, setActiveAlarmModal] = useState(null);
    const audioRef = useRef(null); // Referência ao áudio

    // Função para tocar o som
    const playAlarmSound = () => {
        audioRef.current = new Audio(Mp3);
        audioRef.current.loop = true; // Loop até o usuário fechar o modal
        audioRef.current.play().catch(error => console.error('Erro ao tocar o som:', error));
    };

    // Função para parar o som
    const stopAlarmSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reseta o som
        }
    };

    // Verifica os alarmes
    const checkAlarms = () => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const currentDate = now.toLocaleDateString("en-CA");

        alarms.forEach((alarm) => {
            if (alarm.active && alarm.time === currentTime && alarm.date === currentDate) {
                if (!triggeredAlarms.includes(alarm.id)) {
                    playAlarmSound();
                    setTriggeredAlarms((prev) => [...prev, alarm.id]);
                    setActiveAlarmModal(alarm); // Abre o modal com os detalhes do alarme
                }
            }
        });
    };

    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                setShowModal(false);
                window.removeEventListener('click', handleInteraction);
            }
        };

        window.addEventListener('click', handleInteraction);

        const interval = setInterval(() => {
            if (hasInteracted) {
                checkAlarms();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hasInteracted, alarms, triggeredAlarms]);

    const toggleAlarm = (id) => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((alarm) =>
                alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
            )
        );
        setTriggeredAlarms((prev) => prev.filter((alarmId) => alarmId !== id));
    };

    const deleteAlarm = (id) => {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
        setTriggeredAlarms((prev) => prev.filter((alarmId) => alarmId !== id));
    };

    return (
        <div className={styles.App}>
            {/* Modal inicial */}
            {showModal && (
                <div className="modal" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
                }}>
                    <div className="modal-content" style={{ backgroundColor: '#02061e', padding: '20px', borderRadius: '10px', color: '#fff' }}>
                        <p style={{ fontSize: '18px', textAlign: 'center' }}>Clique em "Confirmar" para liberar o alarme.</p>
                        <button onClick={() => setHasInteracted(true)} style={{
                            backgroundColor: '#fa6e49', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer'
                        }}>
                            Confirmar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal do Alarme Disparado */}
            {activeAlarmModal && (
                <div className="modal" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#02061e', padding: '20px', borderRadius: '10px', color: '#fff', textAlign: 'center'
                    }}>
                        <h2>⏰ Alarme Disparado!</h2>
                        <p><strong>Hora:</strong> {activeAlarmModal.time}</p>
                        <p><strong>Data:</strong> {activeAlarmModal.date}</p>
                        <button onClick={() => { stopAlarmSound(); setActiveAlarmModal(null); }} style={{
                            backgroundColor: '#fa6e49', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', marginTop: '10px'
                        }}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Conteúdo Principal */}
            <div className={styles.reminderContainer}>
                <h1 className={styles.heading}>Meu Alarme com Som</h1>
                <div className={styles.main}>
                    <h2 className={styles.title}>Alarmes Agendados</h2>
                    <p>Aqui ficará os alarmes que você tem agendado e o horário e data que eles irão tocar.</p>
                    <table className={styles.alarmTable}>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Data</th>
                                <th>Ativo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alarms.map((alarm) => (
                                <tr key={alarm.id} className={alarm.active ? styles.activeRow : styles.inactiveRow}>
                                    <td>{alarm.time}</td>
                                    <td>{alarm.date}</td>
                                    <td>{alarm.active ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <button
                                            className={`${styles.toggleButton} ${alarm.active ? styles.active : styles.inactive}`}
                                            onClick={() => toggleAlarm(alarm.id)}
                                        >
                                            {alarm.active ? 'Desativar' : 'Ativar'}
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => deleteAlarm(alarm.id)}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
