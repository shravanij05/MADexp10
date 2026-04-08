const CACHE_NAME = 'zenvy-cache-v1';
const urlsToCache = [
  '/','/index.html','/static/js/main.chunk.js',
  '/static/js/0.chunk.js','/static/js/bundle.js','/static/css/main.chunk.css','/manifest.json'
];
// Install event – cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});
// Activate event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});
// Fetch event – network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone and cache fresh response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          if (event.request.method === 'GET') {
            cache.put(event.request, responseClone);
          }
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
