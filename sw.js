var CACHE_NAME = 'irevive-v1';
var toCache = [
  '/', '/index.html', '/css/styles.css', '/js/app.js'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      return response || fetch(e.request).then(function(res){
        // add to cache for future
        return caches.open(CACHE_NAME).then(function(cache){
          try { cache.put(e.request, res.clone()); } catch(err){ /* no-op */ }
          return res;
        });
      }).catch(function(){ return caches.match('/index.html'); })
    })
  );
});
