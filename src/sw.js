importScripts('./ngsw-worker.js');
((() => {
  'use strict';
  const connection = new EventSource('http://localhost:3000/api/v1/fan/cord/pull/sse');
  connection.onmessage = (event) => {
    //console.log(event.data);
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          data: event.data
        });
      });
    });
  }
})());

self.addEventListener('message', event => {
  console.log(`[Message] event: `, event);
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        value: event.data.value
      });
    })
  })
});

self.addEventListener("fetch", function (event) {});
