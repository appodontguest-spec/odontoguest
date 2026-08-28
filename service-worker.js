// OdontoGuest mudou de endereço para https://odontoguest.pages.dev/
// Este service worker existe só pra limpar o que a versão antiga instalou
// (cache + o próprio registro) em quem já tinha o app instalado neste domínio,
// e mandar essas abas pro endereço novo.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.navigate('https://odontoguest.pages.dev/')))
  );
});
