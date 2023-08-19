import Keyv from 'keyv';
import { randomUUID } from 'crypto';
import { setTimeout } from 'timers/promises';

const keyv = new Keyv('postgresql://<user>:<password>@localhost:5432/<database>');

keyv.on('message', (data) => {
  (async () => {
    await keyv.set(randomUUID(), data);
  })();
});

try {
  keyv.emit('message', {
    name: 'Nicolas Cage',
    age: 59,
  });
} catch (err) {
  console.error(err);
} finally {
  (async () => {
    await setTimeout(1000);
    await keyv.disconnect();
  })();
}
