/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */

// const CACHE = 'wordpedia-cache';
// const precacheFiles = [
//   'index.html',
//   'app.js'
// ];
//
// const offlineFallbackPage = 'index.html';
//
// const networkFirstPaths = [
//   /* Add an array of regex of paths that should go network first */
//   // Example: /\/api\/.*/
// ];
//
// const avoidCachingPaths = [
//   /* Add an array of regex of paths that shouldn't be cached */
//   // Example: /\/api\/.*/
// ];
//
// const pathComparer = (requestUrl, pathRegEx) => {
//   return requestUrl.match(new RegExp(pathRegEx));
// };
//
// const comparePaths = (requestUrl, pathsArray) => {
//   if (requestUrl) {
//     for (let index = 0; index < pathsArray.length; index += 1) {
//       const pathRegEx = pathsArray[index];
//       if (pathComparer(requestUrl, pathRegEx)) {
//         return true;
//       }
//     }
//   }
//
//   return false;
// };
//
// const updateCache = (request, response) => {
//   if (!comparePaths(request.url, avoidCachingPaths)) {
//     return caches.open(CACHE).then((cache) => {
//       return cache.put(request, response);
//     });
//   }
//
//   return Promise.resolve();
// };
//
// const fromCache = (request) => {
//   return caches.open(CACHE).then((cache) => {
//     return cache.match(request).then((matching) => {
//       if (!matching || matching.status === 404) {
//         return Promise.reject('no-match');
//       }
//
//       return matching;
//     });
//   });
// };
//
// const cacheFirstFetch = (event) => {
//   event.respondWith(fromCache(event.request).then((response) => {
//     event.waitUntil(fetch(event.request).then((resp) => (updateCache(event.request, resp))));
//
//     return response;
//   }, () => {
//     // The response was not found in the cache so we look for it on the server
//     return fetch(event.request).then((response) => {
//       // If request was success, add or update it in the cache
//       event.waitUntil(updateCache(event.request, response.clone()));
//
//       return response;
//     }).catch(() => {
//       // The following validates that the request was for a navigation to a new document
//       if (event.request.destination !== 'document' || event.request.mode !== 'navigate') {
//         return;
//       }
//
//       return caches.open(CACHE).then((cache) => (cache.match(offlineFallbackPage)));
//     });
//   }));
// };
//
// const networkFirstFetch = (event) => {
//   event.respondWith(fetch(event.request).then((response) => {
//     // If request was success, add or update it in the cache
//     event.waitUntil(updateCache(event.request, response.clone()));
//     return response;
//   }).catch(() => (fromCache(event.request))));
// };
//
// self.addEventListener('install', (event) => {
//   self.skipWaiting();
//
//   event.waitUntil(
//     caches.open(CACHE).then((cache) => {
//       return cache.addAll(precacheFiles).then(() => {
//         if (offlineFallbackPage === 'index.html') {
//           return cache.add(new Response('Update the value of the offlineFallbackPage constant in the serviceworker.'));
//         }
//
//         return cache.add(offlineFallbackPage);
//       });
//     })
//   );
// });
//
// // Allow sw to control of current page
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });
//
// // If any fetch fails, it will look for the request in the cache and serve it from there first
// self.addEventListener('fetch', (event) => {
//   if (event.request.method !== 'GET') return;
//
//   if (comparePaths(event.request.url, networkFirstPaths)) {
//     networkFirstFetch(event);
//   } else {
//     cacheFirstFetch(event);
//   }
// });
