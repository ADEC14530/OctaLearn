const CACHE_NAME = "octalearn-cache-v2";
const FALLBACK_URL = "fallback.html";

// Add important files to cache during install
const urlsToCache = [
  "/",              // homepage
  "/index.html",
  "/converter.html", 
  "/G.html",
  "/O.css",
  "/O.js",
  "/fallback.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Serve requests
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => {
      // If not cached, show fallback page
      return response || caches.match(FALLBACK_URL);
    }))
  );
});

// Update cache if new version
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});


