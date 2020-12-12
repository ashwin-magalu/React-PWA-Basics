let cacheData = "app-v1"; //name of the cache file

// To set the file in cache
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/0.bundle.js",
        "/static/js/bundle.js",
        "/index.html",
        "/", //caching home route
        "/users", //caching users route
        "/about", //caching about route
      ]);
      /* 
    cache.addAll([]) ==> the file paths in this array is obtained from the Cache Storage of localhost:3000 in Application Tab, while inspecting
    "/static/js/bundle.js" file makes our page load in offline mode as well
    */
    })
  );
});

// To fetch data from cache or offline loading
this.addEventListener("fetch", (e) => {
  if (!navigator.onLine) {
    //only if we are offline, data will be loaded from cache
    if (e.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      e.waitUntil(
        //For push notification, it will work only when user is offline
        this.registration.showNotification("Internet", {
          body: "Internet not working",
        })
      );
    }

    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
        let requestURL = e.request.clone();
        fetch(requestURL);
      })
    );
  }
});

// Activate the Service Worker
//here we remove all the previous caches and keep the new one
this.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(cacheData);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
            /* 
            If cacheWhitelist does not include the cacheName, then we will delete that cacheName. But if cacheWhitelist includes that cacheName, then we want to keep it 
            */
          }
        })
      )
    )
  );
});
