console.log('inside sw');
let currentCacheName = 'restaurants-v4';
//const publicUrl = `${process.env.PUBLIC_URL}/`;
//console.log(publicUrl);

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        'src/App.js',
        'src/index.js',
        'src/Map.js',
        'src/RestaurantList.js',
        'src/RestaurantsAPI.js',
        'src/App.css',
        'src/index.css'
        //'//normalize-css.googlecode.com/svn/trunk/normalize.css'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurants') &&
            cacheName != currentCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) return response;
      return fetch(event.request)
        .then(dynResponse => {
          return caches.open(currentCacheName).then(cache => {
            cache.put(event.request.url, dynResponse.clone());
            return dynResponse;
          });
        });
    })
  );
});