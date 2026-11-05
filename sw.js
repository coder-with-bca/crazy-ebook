const CACHE = "crazy-ebook-v71";
const FILES = ["./assets/cursor-book.svg", "./assets/tap.wav", "./", "./index.html", "./new.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./diwali.js", "./hero-3d.js", "./upi-qr.jpg", "./img/logo-crazy-badge.png", "./img/promo-sample.webp", "./img/promo-bilingual.webp", "./img/promo-telegram.webp", "./img/cat-prog.webp", "./img/cat-self.webp", "./img/cat-comics.webp", "./covers/IMG-20261007-WA0087.webp", "./covers/cp30.webp", "./covers/cpp30.webp", "./covers/cppwb.webp", "./covers/css30.webp", "./covers/csswb.webp", "./covers/cwb.webp", "./covers/d30.webp", "./covers/dwb.webp", "./covers/f30.webp", "./covers/fwb.webp", "./covers/g30.webp", "./covers/gh30.webp", "./covers/ghwb.webp", "./covers/gwb.webp", "./covers/h30.webp", "./covers/hwb.webp", "./covers/j30.webp", "./covers/js30.webp", "./covers/jswb.webp", "./covers/jwb.webp", "./covers/k30.webp", "./covers/kwb.webp", "./covers/motivational-en-cover.webp", "./covers/motivational-hi-cover.webp", "./covers/p30d-cover.webp", "./covers/pwbc-cover.webp", "./covers/s30.webp", "./covers/self-improvement-en-cover.webp", "./covers/self-improvement-hi-cover.webp", "./covers/swb.webp"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match("./index.html")))
  );
});
