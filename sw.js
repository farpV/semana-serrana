/* Agenda personal — service worker: la app abre sin conexión. */
var CACHE = "agenda-personal-v4";
var ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'img/hoy.webp',
  'img/agenda.webp',
  'img/entreno.webp',
  'img/comida.webp',
  'img/banda.webp',
  'img/estudio.webp'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;

  // Tipografías y otros recursos externos: caché primero, red como respaldo.
  if(new URL(req.url).origin !== self.location.origin){
    e.respondWith(
      caches.match(req).then(function(hit){
        return hit || fetch(req).then(function(res){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
          return res;
        }).catch(function(){ return hit; });
      })
    );
    return;
  }

  // Propios: caché primero y actualización en segundo plano.
  e.respondWith(
    caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){
        return hit || caches.match('index.html');
      });
      return hit || net;
    })
  );
});
