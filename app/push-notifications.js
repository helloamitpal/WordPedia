/* eslint-disable no-restricted-globals */
console.log('Push notification is loaded');

// push notification event listener
self.addEventListener('push', (ev) => {
  const { title, body, actions, data } = ev.data.json();
  console.log('Received push');
  ev.waitUntil(self.registration.showNotification(title, {
    body,
    data,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    icon: 'favicon.ico',
    actions
  }));
});

// notification action listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'forget' || event.action === 'remember') {
    const { title, body } = event.notification.data[event.action];
    self.registration.showNotification(title, { body });
  }
}, false);
