/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "39372af2e291407b8359a5b4088fa124"
  },
  {
    "url": "assets/css/0.styles.ec18f56f.css",
    "revision": "0b3dc79f284b6831ea1ccc8b9197c741"
  },
  {
    "url": "assets/img/GetAllUsers.05b3e729.png",
    "revision": "05b3e72903018a7e0358a7d60ee19d85"
  },
  {
    "url": "assets/img/Registration.30a661ac.png",
    "revision": "30a661acd7064eb4a7341e00d62ea60c"
  },
  {
    "url": "assets/img/relationalSchema.4d0bdb0b.png",
    "revision": "4d0bdb0b4bb3551211c4ab0253c38a6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4110b0f8.js",
    "revision": "5fa02d80a35a85399d1d756b8091fd1e"
  },
  {
    "url": "assets/js/11.bf61c069.js",
    "revision": "d73d7a4a5e7dd0bd97b20bdf2139515d"
  },
  {
    "url": "assets/js/12.60df66d1.js",
    "revision": "adfea44b7fac6b3850cef7a8d37f6076"
  },
  {
    "url": "assets/js/13.d4031b12.js",
    "revision": "1a470376d7d46a733e15160d26927435"
  },
  {
    "url": "assets/js/14.549fdd63.js",
    "revision": "7d620cb01f9689a0cfe4c8e7f71a375d"
  },
  {
    "url": "assets/js/15.3032eb6d.js",
    "revision": "b8fb47c325b3046c51ff1081bce33807"
  },
  {
    "url": "assets/js/16.ee83c23b.js",
    "revision": "7fded7a7103ea06b714c5604065b3d7d"
  },
  {
    "url": "assets/js/17.500f8d7d.js",
    "revision": "88bb93ae53d94eeb60bcb32ae87352a7"
  },
  {
    "url": "assets/js/18.6669db86.js",
    "revision": "f230ce4faebadae55e7bb8ed621e256c"
  },
  {
    "url": "assets/js/19.33ffd5a0.js",
    "revision": "f0bae812da65827cd37daf00b803f325"
  },
  {
    "url": "assets/js/2.b8b56612.js",
    "revision": "156620ddf955d355d5aa367d4e8b09aa"
  },
  {
    "url": "assets/js/20.3e71e2b7.js",
    "revision": "7c98e59f2e1fc9465a8208eac64a9770"
  },
  {
    "url": "assets/js/21.78f8bc6c.js",
    "revision": "750a4abf4075c61c7b63535661f1e220"
  },
  {
    "url": "assets/js/22.0ce00be1.js",
    "revision": "9b1d37564b5244ae1e61b963a8a69e4f"
  },
  {
    "url": "assets/js/23.0332627f.js",
    "revision": "cb0cd3901872d1c9c7c0cd4aff77d8f0"
  },
  {
    "url": "assets/js/24.6796e6c2.js",
    "revision": "64c408112536422fd879312aa866918c"
  },
  {
    "url": "assets/js/26.9d67839e.js",
    "revision": "9edf7d0cebd3a94f7e4a466d966516e7"
  },
  {
    "url": "assets/js/3.153ce8c1.js",
    "revision": "c3fb20dc099f64518a7fada950b4af38"
  },
  {
    "url": "assets/js/4.9665f53c.js",
    "revision": "6b3f8ed1e30f377a6a8b5fba04c1b8af"
  },
  {
    "url": "assets/js/5.34f61885.js",
    "revision": "8e4f0a15c00ec5abc2085d4ce9d39ce5"
  },
  {
    "url": "assets/js/6.12d36788.js",
    "revision": "146bc4a209da3db6f1d4804525c64829"
  },
  {
    "url": "assets/js/7.54046d49.js",
    "revision": "e4158f6fa01dbb94ecc2083a8cfe38df"
  },
  {
    "url": "assets/js/8.785c673c.js",
    "revision": "030bacc78c28aa9d3d4b5eb3f655d84e"
  },
  {
    "url": "assets/js/9.d02f4242.js",
    "revision": "84c2abfa373457a4c27d9727caacdc27"
  },
  {
    "url": "assets/js/app.40d6438e.js",
    "revision": "a958509256457a83b0901264c71c4570"
  },
  {
    "url": "conclusion/index.html",
    "revision": "a9a946c1436c6509bd9a844a5d5c7dc8"
  },
  {
    "url": "design/index.html",
    "revision": "231e7989aabb46c39522e8369f125813"
  },
  {
    "url": "index.html",
    "revision": "5060a1c87879bd2046d5abf6d4589727"
  },
  {
    "url": "intro/index.html",
    "revision": "a0c570dd6b6b0f4ba9d4938d961e4736"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "ad0fff5bfd1667521e19bdf634708081"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "8ad8dad29ffac5dfc203a5d6ec67e6f8"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "af29728ea96703e5e34d860cbbb5d2e2"
  },
  {
    "url": "software/index.html",
    "revision": "13008965f390ece3308a20e17f4fd93b"
  },
  {
    "url": "test/index.html",
    "revision": "c8b97735c763c98fbec674614a43e1b8"
  },
  {
    "url": "use cases/index.html",
    "revision": "86f6daf40a4a8e09a01133be3e098435"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
