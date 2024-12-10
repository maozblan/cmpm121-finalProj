const CACHE_NAME = 'gamecache-v1';
const BASE_PATH = `/${location.pathname.split('/')[1]}/`.replace(/\/$/, '');
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/load.png`,
  `${BASE_PATH}/redo.png`,
  `${BASE_PATH}/undo.png`,
  `${BASE_PATH}/redo_pressed.png`,
  `${BASE_PATH}/save_pressed.png`,
  `${BASE_PATH}/undo_pressed.png`,
  `${BASE_PATH}/load_pressed.png`,
  `${BASE_PATH}/save.png`,
  `${BASE_PATH}/cloud.png`,
  `${BASE_PATH}/rainCloud.png`,
  `${BASE_PATH}/help.png`,
  `${BASE_PATH}/help_pressed.png`,
  `${BASE_PATH}/plant.png`,
  `${BASE_PATH}/reap.png`,
  `${BASE_PATH}/sun.png`,
  `${BASE_PATH}/soil.png`,
  `${BASE_PATH}/player.png`,
  `${BASE_PATH}/index.css`,
  `${BASE_PATH}/index.js`,
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