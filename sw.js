const CACHE = 'sweet-desk-v8';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const u = e.request.url;
  // 天气 API 实时数据走网络；其余请求才进缓存逻辑
  if (u.includes('open-meteo.com') || u.includes('weather.com.cn')) return;
  if (e.request.method !== 'GET') return;
  // 页面本身（导航 / index.html）：网络优先，保证每次发布都实时生效；离线时回退缓存
  if (e.request.mode === 'navigate' || u.endsWith('index.html') || u.endsWith('/') || u.endsWith('/index.html')) {
    e.respondWith(
      fetch(e.request)
        .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./')))
    );
    return;
  }
  // 静态资源：缓存优先，离线可用
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./'))));
});
