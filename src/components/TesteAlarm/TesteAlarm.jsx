import React from 'react';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';

const App = () => {
    // Função para mostrar a notificação
    const handleButtonClick = () => {
        addNotification({
            title: 'Alerta!',
            subtitle: 'Subtítulo opcional',
            message: 'Esta é uma notificação personalizada com tema e ícone.',
            theme: 'darkblue',
            native: true,
            icon: 'https://example.com/icon.png', // Substitua pelo seu ícone
            duration: 5000,
            vibrate: [100, 200, 100], // Vibração para dispositivos móveis
            onClick: (e) => {
                console.log('Notificação clicada!', e);
            },
        });
    };

    return (
        <div className="app">
            <Notifications />
            <div className="content">
                <button onClick={handleButtonClick}>Mostrar Notificação</button>
            </div>
        </div>
    );
};

export default App;
