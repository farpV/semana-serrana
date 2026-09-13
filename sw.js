/* Agenda personal — service worker.
   La página siempre se pide a la red primero, así los cambios se ven al instante.
   La caché queda de respaldo para cuando no hay cobertura. */
var CACHE = 'agenda-personal-v5';
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
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS) }).then(function(){ return self.skipWaiting() })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k) }));
    }).then(function(){ return self.clients.claim() })
  );
});

function esPagina(req){
  if(req.mode === 'navigate') return true;
  var u = new URL(req.url);
  return u.origin === self.location.origin && (u.pathname.endsWith('/') || u.pathname.endsWith('index.html'));
}

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;

  // La página: red primero, caché si no hay red.
  if(esPagina(req)){
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put('index.html', copy) });
        return res;
      }).catch(function(){
        return caches.match('index.html').then(function(hit){ return hit || caches.match('./') });
      })
    );
    return;
  }

  // Todo lo demás (imágenes, iconos, tipografías): caché primero y refresco por detrás.
  e.respondWith(
    caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy) });
        return res;
      }).catch(function(){ return hit });
      return hit || net;
    })
  );
});
