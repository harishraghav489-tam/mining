const CACHE_NAME = 'mineguard-admin-v4';

// Install: Precache shell using registration scope
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const scope = self.registration.scope;
      const assetsToCache = [
        scope,
        `${scope}monitoring/`,
        `${scope}map/`,
        `${scope}alerts/`,
        `${scope}analytics/`,
        `${scope}reports/`,
        `${scope}satellite/`,
        `${scope}users/`,
        `${scope}settings/`,
        `${scope}manifest.json`,
        `${scope}icon-192.png`,
        `${scope}icon-512.png`,
        `${scope}apple-touch-icon.png`,
        `${scope}favicon.png`,
      ];

      await Promise.allSettled(
        assetsToCache.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response && (response.ok || response.type === 'opaque')) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn('SW: Precache skipped for:', url);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate: Clean up older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Offline Cache-First with Network Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  // HTML page navigations
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;

          const scopeCached = await caches.match(self.registration.scope);
          return scopeCached || new Response('Offline - MineGuard Admin Active', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // Static assets and Leaflet tiles
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.url.includes('arcgisonline.com') || request.url.includes('basemaps.cartocdn.com')) {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#090d16" stroke="#1e293b" stroke-width="1"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
          return cachedResponse;
        });
    })
  );
});
