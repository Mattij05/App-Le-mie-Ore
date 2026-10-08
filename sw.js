const C='le-mie-ore-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./icon.png','./manifest.json']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r,{cache:'no-cache'}).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));
  }else if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){
    e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{const cp=y.clone();caches.open(C).then(c=>c.put(r,cp));return y})));
  }
});
