var CACHE_NAME = 'metro-cache-v9';
var urlsToCache = [
    '/',
    '/images/metro-192.png',
    '/index.html',
    '/index.js',
    '/manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);        
        }
      )
    );
  });

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHE_NAME !== key) {
          return caches.delete(key);
        }
      }));
    })
  );
});
