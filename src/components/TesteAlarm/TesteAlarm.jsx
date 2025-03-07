import React, { useEffect } from 'react';

const TesteAlarm = () => {
  // Função para verificar e registrar o service worker
  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso!', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    } else {
      console.log('Service Worker não suportado neste navegador.');
    }
  };

  // Função para disparar a notificação
  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      // Tenta exibir uma notificação push com service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Alerta de Teste!', {
            body: 'Esta é uma notificação push com service worker!',
            icon: 'https://example.com/icon.png',
            vibrate: [100, 200, 100],
            tag: 'test-notification',
          });
        }).catch((error) => {
          console.error('Erro ao mostrar a notificação com o service worker:', error);
        });
      } else {
        // Se o service worker não for suportado, usa a notificação padrão
        new Notification('Alerta de Teste!', {
          body: 'Esta é uma notificação simples de teste!',
          icon: 'https://example.com/icon.png',
          vibrate: [100, 200, 100],
        });
      }
    } else {
      // Solicitar permissão para notificações
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  };

  // Chama a função de registro do service worker ao montar o componente
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <div>
      <button onClick={showNotification}>Testar Alarme</button>
    </div>
  );
};

export default TesteAlarm;
