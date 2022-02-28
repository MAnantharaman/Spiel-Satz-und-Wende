
/* Based on https://github.com/pwafire/pwafire/blob/main/bundle/default/service-worker.js.
  After a service worker is installed and the user navigates to a different page or 
  refreshes,the service worker will begin to receive fetch events */  
  self.addEventListener('fetch', (event) => {
    // Fix from https://github.com/iamshaunjp/pwa-tutorial/issues/1
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
    event.respondWith(caches.open('cache').then((cache) => {
      return cache.match(event.request).then((response) => {
        console.log("cache request: " + event.request.url);
         var fetchPromise = fetch(event.request).then((networkResponse) => {           
  // if we got a response from the cache, update the cache                   
  console.log("fetch completed: " + event.request.url, networkResponse);
    if (networkResponse) {
      console.debug("updated cached page: " + event.request.url, networkResponse);
        cache.put(event.request, networkResponse.clone());}
          return networkResponse;
            }, function (event) {   
  // rejected promise - just ignore it, we're offline!   
            console.log("Error in fetch()", event);
            event.waitUntil(
  // our 'cache' here is named *cache* in the caches.open()
            caches.open('cache').then((cache) => { 
            return cache.addAll
            ([            
  // cache.addAll(), takes a list of URLs, then fetches them from 
  // the server and adds the response to the cache          
          'index.html', 'script.js', 'style.css', '*.png', '*.jpeg', 'images/*', 'manifest.json',
            ]); }) 
          ); });
  // respond from the cache, or the network
    return response || fetchPromise;
  }); }));
  });

  // always updating i.e latest version available
  self.addEventListener('install', (event) => {
      self.skipWaiting();
      console.log("Latest version installed!");
  });

