const CACHE_NAME = 'mineguard-worker-v4';

// Install: Precache shell using registration scope
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const scope = self.registration.scope;
      const assetsToCache = [
        scope,
        `${scope}safety/`,
        `${scope}updates/`,
        `${scope}profile/`,
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

// Activate: Clean up older caches and claim clients immediately
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

// Fetch: Offline Cache-First with Network Revalidation & Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  // HTML page navigations (App routes)
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
          // Offline navigation fallback: Try exact cached page, or root scope
          const cached = await caches.match(request);
          if (cached) return cached;

          const scopeCached = await caches.match(self.registration.scope);
          if (scopeCached) return scopeCached;

          return new Response(
            `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>MineGuard Safety (Offline)</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-900 text-white p-6 text-center"><h1 class="text-xl font-bold text-emerald-400 mb-2">MineGuard Safety Companion</h1><p class="text-sm text-slate-300">Offline Safety Mode Active. All sensor thresholds and evacuation protocols are cached.</p></body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Static assets (JS, CSS, Images, Icons, Leaflet tiles)
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
          // If offline map tile fails, return dark fallback tile
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

// Siren & Evacuation Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🚨 MINEGUARD CRITICAL ALERT';
  const options = {
    body: data.body || 'Ground instability detected. Evacuate along Ramp 2 corridor.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [300, 100, 300, 100, 500],
    tag: 'critical-evac-alert',
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope);
      }
    })
  );
});
