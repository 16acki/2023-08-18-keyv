import Keyv from 'keyv';

(async () => {
  let keyv;
  try {
    keyv = new Keyv('redis://localhost:6379');
    keyv.on('error', err => console.error(err));

    const start = performance.now();
    let i = 0;
    while (i < 1000000) {
      await keyv.set(`key${i}`, `value${i}`);
      i++;
    }
    console.log(performance.now() - start);
  } catch (err) {
    console.error(err);
  } finally {
    await   keyv?.disconnect();
  }
})();
