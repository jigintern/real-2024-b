// Cache name
const CACHE_NAME = "pwa-heyhey-caches";
// Cache targets
const urlsToCache = [
  "./img/favicon/*",
  ".//img/noImage.jpg",
  "./img/footer_edit.png",
  "./img/footer_home.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response ? response : fetch(event.request);
    })
  );
});
