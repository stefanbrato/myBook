const assets = [
  "/",
  "./components",
  "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/reactive-element.js",
  "https://ga.jspm.io/npm:lit@2.7.0/index.js",
  "https://ga.jspm.io/npm:lit-element@3.3.0/lit-element.js",
  "https://ga.jspm.io/npm:lit-html@2.7.0/lit-html.js",
  "https://ga.jspm.io/npm:lit-html@2.7.0/is-server.js",
  "https://ga.jspm.io/npm:es-module-shims@1.7.2/dist/es-module-shims.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    })
  );
});
