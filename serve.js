  // sw.js
const CACHE_NAME = "octalearn-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/converter.html",
  "/G.html",
  "/upload.html",
  "/fall.html",
  "/blog.html",
  "/cv.html",
  "/partners.html",
  "/pomodoro.html",
  "/privacy.html",
  "/terms.html",
  "/tools.html",
  "/O.css",
  "/O.js"
];

// Install and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // If it's a navigation request, show fallback
      if (event.request.mode === "navigate") {
        return caches.match("/fall.html");
      }
      // Otherwise try cache
      return caches.match(event.request);
    })
  );
});



