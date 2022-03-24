import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable() {
  yield Buffer.from('This is my');
  await setTimeout(100);
  yield Buffer.from('custom readable');
}

async function* myCustomTransform(stream) {
  for await (const chunck of stream) {
    yield chunck.toString().replace(/\s/g, '_');
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];
  for await (const chunck of stream) {
    console.log('[duplex writable]', chunck);
    bytesRead += chunck.length;
    wholeString.push(chunck);
  }

  yield `wholeString ${wholeString.join()}`;
  yield `bytesRead ${bytesRead}`;
}

async function* myCustomWritable(stream) {
  for await (const chunck of stream) {
    console.log('[writable]', chunck);
  }
}

try {
  const controller = new AbortController();
  // caso precise cancelar um fluxo
  setImmediate(() => controller.abort());

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  );

  console.log('process has finished!');
} catch (err) {
  console.error('\nabort', err.message);
}
