const CACHE_NAME = 'gamecache-v1';
const BASE_PATH = `/${location.pathname.split('/')[1]}/`.replace(/\/$/, '');
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.css`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/index.js`,
  `${BASE_PATH}/player.png`,
  `${BASE_PATH}/soil.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.error(`Failed to cache ${url}:`, err);
          })
        )
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});