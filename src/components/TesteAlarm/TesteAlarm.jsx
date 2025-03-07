import React, { useEffect } from 'react';

const TesteAlarm = () => {
  // Solicitar permissão para notificações ao carregar a página
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        console.log('Permissão para notificações:', permission);
      });
    }
  }, []);

  // Função para disparar a notificação
  const showNotification = () => {
    if (!('Notification' in window)) {
      console.error('O navegador não suporta notificações.');
      return;
    }

    if (Notification.permission === 'granted') {
      // Teste primeiro sem Service Worker
      new Notification('Alerta de Teste!', {
        body: 'Esta é uma notificação simples de teste!',
        icon: 'https://example.com/icon.png',
        vibrate: [100, 200, 100],
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification();
        } else {
          console.warn('Usuário negou as notificações.');
        }
      });
    }
  };

  return (
    <div>
      <button onClick={showNotification}>Testar Alarme</button>
    </div>
  );
};

export default TesteAlarm;
