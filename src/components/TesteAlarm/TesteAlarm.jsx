import React, { useEffect } from 'react';

function TesteAlarm() {
    // Função para solicitar permissão e mostrar notificação
    const showNotification = () => {
        if (Notification.permission === "granted") {
            setTimeout(() => {
                new Notification("Aqui está sua notificação no navegador!");
            }, 1000);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Mostrando notificação após permissão...");
                    new Notification("Aqui está sua notificação!", {
                        body: "Mensagem adicional para o usuário.",
                        icon: "",
                    });
                }
            });
        }
    };


    useEffect(() => {
        // Ao carregar, verificar se o navegador já tem permissão para enviar notificações
        if (Notification.permission === "granted") {
            console.log("Permissão para notificações já foi concedida");
        } else if (Notification.permission === "denied") {
            console.log("Permissão para notificações negada");
        }
    }, []);

    return (
        <div>
            <h1>Meu site com Notificação no Navegador</h1>
            <button onClick={showNotification}>Mostrar Notificação</button>
        </div>
    );
}

export default TesteAlarm;
