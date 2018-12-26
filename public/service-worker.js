// workbox.setConfig({
//   "debug": true
// })

// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
    prefix: 'vue-pwa-app',
    suffix: 'v1.0.0',
});

// have our sw update and control a web page as soon as possible.
workbox.skipWaiting();
workbox.clientsClaim();

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerNavigationRoute('/index.html');


workbox.routing.registerRoute(new RegExp('https://nestjs-pulsifi.herokuapp.com/.*'), workbox.strategies.networkFirst({}), 'GET')

const bgSyncPlugin = new workbox.backgroundSync.Plugin('SyncQueue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
    'https://nestjs-pulsifi.herokuapp.com/*',
    workbox.strategies.networkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);