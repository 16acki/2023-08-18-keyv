import { createClient } from 'redis';

(async () => {
  let client;
  try {
    client = createClient();
    client.on('error', err => console.error(err));
    await client.connect();

    const start = performance.now();
    let i = 0;
    while (i < 1000000) {
      await client.get(`key${i}`);
      i++;
    }
    console.log(performance.now() - start);
  } catch (err) {
    console.error(err);
  } finally {
    await   client?.disconnect();
  }
})();
