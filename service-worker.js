self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),  // Corpo da notificação
      icon: '/images/icon.png',  // Ícone
      badge: '/images/badge.png'  // Badge
    };
  
    event.waitUntil(
      self.registration.showNotification('Notificação Push', options)  // Exibe a notificação
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Fecha a notificação
    event.waitUntil(
      clients.openWindow('https://www.seusite.com') // Ação ao clicar na notificação
    );
  });
  