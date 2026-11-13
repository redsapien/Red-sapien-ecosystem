const CACHE='rs-fabrica-v3';
self.addEventListener('install',e=>e.waitUntil((async()=>{await self.skipWaiting();const c=await caches.open(CACHE);await c.addAll(['../','./','../manifest.webmanifest'])})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('rs-fabrica-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('../'))))});
