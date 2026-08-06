self.addEventListener('push', function (e) {
  const data = e.data ? e.data.json() : { title: 'Reptile Care Reminder', body: 'Check your reptile care schedule.' };
  const options = {
    body: data.body || 'Time for feeding, watering, or health check.',
    icon: '/reptiles/geckos/crested-gecko.png',
    badge: '/next.svg',
    tag: data.tag || 'reptile-reminder',
    requireInteraction: true,
  };
  e.waitUntil(self.registration.showNotification(data.title || 'Drakora', options));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://drakora.vercel.app/dashboard'));
});
