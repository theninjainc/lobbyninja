import { useState, useEffect } from "react";
import { ThemeProvider } from "./utils/ThemeContext/ThemeContext";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import Login from "./components/login/login";
import ConfigUser from "./components/configUser/configUser";
import { Client, Account } from 'appwrite';
import LoadingScreen from './components/loadingScreen/loadingScreen';
import "./App.css";

function App() {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [alarms, setAlarms] = useState([]);

    const client = new Client();
    const account = new Account(client);
    client.setProject('lobbyninja');

    const checkToken = () => localStorage.getItem("cookieFallback") || null;

    // Funções para manipular os alarmes no localStorage
    const saveAlarmsToStorage = (alarmsData) => {
        localStorage.setItem('userAlarms', JSON.stringify(alarmsData));
    };

    const getAlarmsFromStorage = () => {
        const storedAlarms = localStorage.getItem('userAlarms');
        return storedAlarms ? JSON.parse(storedAlarms) : [];
    };

    const validateToken = async () => {
        try {
            const user = await account.get();
            console.log("Usuário autenticado:", user);
            setIsAuthenticated(true);
            // Carrega os alarmes após autenticar o usuário
            fetchAlarms(user.email);
        } catch (error) {
            localStorage.removeItem("cookieFallback");
            console.error("Erro na validação do token:", error);
            setIsAuthenticated(false);
            setToken("");
        }
    };


    // Função para buscar alarmes
    const fetchAlarms = async (email) => {
        try {
            const response = await fetch('https://ninja.lobby.ninja/api/api/alarmes/');

            if (!response.ok) {
                throw new Error('Erro ao buscar os alarmes.');
            }

            const data = await response.json();
            console.log("Dados recebidos da API:", data);

            const updatedData = data.map(item => {
                // Preservar o horário original na propriedade horaAlarme
                // Apenas formatando horarioInicio e horarioFim para exibição
                const date = new Date(item.horarioInicio);
                const dateEnd = new Date(item.horarioFim);
                const formattedTime = date.toTimeString().slice(0, 5);
                const formattedTimeEnd = dateEnd.toTimeString().slice(0, 5);
                return {
                    ...item,
                    horarioInicio: formattedTime,
                    horarioFim: formattedTimeEnd,
                    // Manter horaAlarme como está, sem manipulação
                };
            });

            console.log("Dados formatados para salvar:", updatedData);
            setAlarms(updatedData);

            // Salvar os alarmes no localStorage como array
            saveAlarmsToStorage(updatedData);

            // Verificar alarmes para o dia atual após carregar
            checkTodaysAlarms(updatedData);
        } catch (error) {
            console.error("Erro ao carregar alarmes:", error);
        }
    };

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            console.log("Este navegador não suporta notificações desktop");
            return false;
        }

        if (Notification.permission === "granted") {
            return true;
        }

        if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            return permission === "granted";
        }

        return false;
    };
    const ALARM_CHECK_INTERVAL = 5000;

    const scheduleTodaysAlarmNotifications = async (todaysAlarms) => {
        console.log("Alarmes para hoje foram registrados para verificação:");
        todaysAlarms.forEach(alarm => {
            console.log(`- ${alarm.nome || "Sem nome"}: ${alarm.horaAlarme}`);
        });
    };

    const checkAlarmsTrigger = (alarmsData) => {
        if (!alarmsData || alarmsData.length === 0) return;

        const today = new Date();
        const dayMap = {
            0: "su", // Domingo
            1: "mo", // Segunda
            2: "tu", // Terça
            3: "we", // Quarta
            4: "th", // Quinta
            5: "fr", // Sexta
            6: "sa"  // Sábado
        };
        const currentDayCode = dayMap[today.getDay()];

        const todaysAlarms = alarmsData.filter(alarm =>
            alarm.dias && alarm.dias.includes(currentDayCode)
        );

        if (todaysAlarms.length === 0) return;

        // Usar UTC para comparação
        const now = new Date();
        const currentHourUTC = now.getHours();
        const currentMinuteUTC = now.getMinutes();

        console.log(`Verificando alarmes: Hora atual UTC: ${currentHourUTC}:${currentMinuteUTC}`);

        todaysAlarms.forEach(alarm => {
            try {
                if (!alarm.horaAlarme) return;

                let alarmHourUTC, alarmMinuteUTC;

                if (typeof alarm.horaAlarme === 'string') {
                    if (alarm.horaAlarme.includes('T')) {
                        const alarmDate = new Date(alarm.horaAlarme);
                        alarmHourUTC = alarmDate.getUTCHours();
                        alarmMinuteUTC = alarmDate.getUTCMinutes();
                    } else if (alarm.horaAlarme.includes(':')) {
                        [alarmHourUTC, alarmMinuteUTC] = alarm.horaAlarme.split(':').map(Number);
                    } else {
                        return;
                    }
                } else {
                    return;
                }

                console.log(`Alarme ${alarm.nome}: UTC ${alarmHourUTC}:${alarmMinuteUTC} | Atual: ${currentHourUTC}:${currentMinuteUTC}`);

                // Verificar se é hora de disparar o alarme (UTC)
                if (currentHourUTC === alarmHourUTC && currentMinuteUTC === alarmMinuteUTC) {
                    console.log(`ALARME DISPARANDO AGORA (UTC): ${alarm.nome || "Sem nome"}`);

                    // Verificar se já notificamos este alarme hoje
                    const alarmKey = `alarm_notified_${alarm.$id || alarm.nome}_${now.toDateString()}`;
                    if (!localStorage.getItem(alarmKey)) {
                        // Notificar e marcar como notificado
                        showNotification(alarm, now);
                        localStorage.setItem(alarmKey, 'true');

                        // Remover após 2 minutos para evitar notificações duplicadas
                        setTimeout(() => {
                            localStorage.removeItem(alarmKey);
                        }, 120000);
                    }
                }
            } catch (error) {
                console.error("Erro ao verificar alarme:", error);
            }
        });
    };

    useEffect(() => {
        // Iniciar a verificação de alarmes em intervalos regulares
        const alarmChecker = setInterval(() => {
            const savedAlarms = getAlarmsFromStorage();
            checkAlarmsTrigger(savedAlarms);
        }, ALARM_CHECK_INTERVAL);

        return () => clearInterval(alarmChecker);
    }, []);

    const showNotification = (alarm, time) => {
        if (!("Notification" in window)) {
            return;
        }

        try {
            console.log("DISPARANDO NOTIFICAÇÃO AGORA!");

            // Tocar som imediatamente (vários métodos para garantir)
            const audio = new Audio('/notification-sound.mp3');
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Erro ao tocar som, tentando novamente:", e);
                    setTimeout(() => {
                        new Audio('/notification-sound.mp3').play()
                            .catch(e => console.error("Falha na segunda tentativa:", e));
                    }, 500);
                });
            }

            // Tentar vibração se disponível
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200, 100, 200]);
            }

            // Criar a notificação
            const notificationOptions = {
                body: alarm.comentario || `É hora do seu alarme!`,
                icon: '/favicon.ico',
                tag: alarm.$id || String(new Date().getTime()),
                requireInteraction: true,
                silent: false
            };

            const notification = new Notification(alarm.nome || "ALARME", notificationOptions);

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            const alertDiv = document.createElement('div');
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.backgroundColor = '#ff4d4f';
            alertDiv.style.color = 'white';
            alertDiv.style.padding = '15px';
            alertDiv.style.borderRadius = '5px';
            alertDiv.style.zIndex = '9999';
            alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            alertDiv.innerHTML = `
            <strong>${alarm.nome || "ALARME"}</strong><br>
            ${alarm.comentario || `É hora do seu alarme!`}
            <button style="margin-left: 10px; padding: 5px 10px; background: white; color: #ff4d4f; border: none; border-radius: 3px; cursor: pointer;">Fechar</button>
        `;
            document.body.appendChild(alertDiv);

            // Remover o alerta após clicar no botão
            alertDiv.querySelector('button').addEventListener('click', () => {
                document.body.removeChild(alertDiv);
            });

            // Auto-remover após 60 segundos
            setTimeout(() => {
                if (document.body.contains(alertDiv)) {
                    document.body.removeChild(alertDiv);
                }
            }, 60000);
        } catch (error) {
            console.error("Erro ao exibir notificação:", error);
            alert(`ALARME: ${alarm.nome || "Sem nome"}`);  // Fallback para alerta básico
        }
    };

    // Função para verificar se hoje é um dos dias programados para o alarme
    const checkTodaysAlarms = (alarmsData) => {
        const today = new Date();
        const dayMap = {
            0: "su", // Domingo
            1: "mo", // Segunda
            2: "tu", // Terça
            3: "we", // Quarta
            4: "th", // Quinta
            5: "fr", // Sexta
            6: "sa"  // Sábado
        };

        const currentDayCode = dayMap[today.getDay()];
        console.log("Dia atual:", currentDayCode);

        // Depurar os alarmes
        console.log("Verificando alarmes para hoje:", alarmsData);
        alarmsData.forEach((alarm, index) => {
            console.log(`Alarme ${index}:`, {
                nome: alarm.nome,
                horaAlarme: alarm.horaAlarme,
                dias: alarm.dias
            });
        });

        // Filtrar alarmes para o dia atual
        const todaysAlarms = alarmsData.filter(alarm =>
            alarm.dias && alarm.dias.includes(currentDayCode)
        );

        console.log(`Encontrados ${todaysAlarms.length} alarmes para hoje (${currentDayCode}):`, todaysAlarms);

        // Programar notificações para os alarmes de hoje
        if (todaysAlarms.length > 0) {
            scheduleTodaysAlarmNotifications(todaysAlarms);
        }
    };

    useEffect(() => {
        const userToken = checkToken();
        if (userToken) {
            setToken(userToken);
            validateToken();
        } else {
            console.log("Nenhum token encontrado no localStorage.");
            setIsAuthenticated(false);
        }

        // Verificar se já existe alarmes no localStorage
        const savedAlarms = getAlarmsFromStorage();
        if (savedAlarms && savedAlarms.length > 0) {
            console.log("Carregando alarmes do localStorage:", savedAlarms);
            setAlarms(savedAlarms);

            // Verificar alarmes para o dia atual ao carregar do storage
            checkTodaysAlarms(savedAlarms);
        }

        // Solicitar permissão de notificação ao iniciar
        requestNotificationPermission().then(permission => {
            if (permission) {
                // Mostrar notificação de teste após 2 segundos
                setTimeout(() => {
                    showTestNotification();
                }, 2000);
            }
        });

        const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    // Adicione este useEffect ao seu componente App, logo após o useEffect existente

    useEffect(() => {
        // Verificar alarmes a cada minuto
        const minutelyCheck = setInterval(() => {
            console.log("Verificação periódica de alarmes...");
            const savedAlarms = getAlarmsFromStorage();
            if (savedAlarms && savedAlarms.length > 0) {
                checkTodaysAlarms(savedAlarms);
            }
        }, 60000); // 60000 ms = 1 minuto

        return () => clearInterval(minutelyCheck); // Limpar o intervalo quando o componente for desmontado
    }, []);

    if (isLoading) return <LoadingScreen />;
    if (!isAuthenticated) {
        return (
            <div className="app-container">
                <Routes>
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        );
    }

    return (
        <ThemeProvider>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/dashboard" element={<Main alarms={alarms} />} />
                        <Route path="/login" element={<Navigate to="/dashboard" />} />
                        <Route path="/alarm" element={<Alarm alarms={alarms} setAlarms={setAlarms} onAlarmsUpdate={(updatedAlarms) => {
                            setAlarms(updatedAlarms);
                            saveAlarmsToStorage(updatedAlarms);
                            // Verificar alarmes ao atualizar
                            checkTodaysAlarms(updatedAlarms);
                        }} />} />
                        <Route path="/registered" element={<Main alarms={alarms} />} />
                        <Route path="/skipped" element={<Main alarms={alarms} />} />
                        <Route path="/favorites" element={<Main alarms={alarms} />} />
                        <Route path="/deleted" element={<Main alarms={alarms} />} />
                        <Route path="/config" element={<ConfigUser />} />

                        {/* Rota coringa para redirecionar para /dashboard se o usuário estiver logado e acessar uma URL inválida */}
                        <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </ThemeProvider>
    );
}

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(error => {
            console.log('Erro ao registrar o Service Worker:', error);
        });
}

export default App;