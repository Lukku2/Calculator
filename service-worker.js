// A unique name for your cache
const CACHE_NAME = 'calculator-pwa-cache-v1';

// The list of files to cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Assuming you have the icon files:
  // 'calculator-icon.png', 
  // 'calculator-icon-large.png'
];

// Install event: Caches all files listed in urlsToCache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and adding files...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Intercepts network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cache
        if (response) {
          return response;
        }
        // No cache hit - fetch from the network
        return fetch(event.request);
      })
  );
});

// Activate event: Cleans up old caches (if you change the CACHE_NAME)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
