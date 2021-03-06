var staticCacheName = 'pomodoro-static-v1';

self.addEventListener('install', function (event) {

  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        './',
        'index.html',
        'favicon.ico',
        'css/circular-prog-bar.css',
        'css/style.css',
        'js/app.js',
        'src/icons.svg',
        'src/alarm.mp3',
        'src/pwa/pomodoro-icon-192.png',
        'src/pwa/pomodoro-icon-512.png',
        'manifest.json',
        'https://fonts.googleapis.com/css?family=Montserrat:300',
        'https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('pomodoro-static-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {

  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === './') {
      event.respondWith(caches.match('./'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});