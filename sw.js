const CACHE_NAME = 'simple-draw-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 初回アクセス時にファイルをiPad内にキャッシュ保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// オフライン時はキャッシュからファイルを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
