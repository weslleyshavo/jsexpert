import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
// import { Worker } from 'worker_threads';
import { Piscina } from 'piscina';

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp';

import { dirname } from 'path';
const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';
const piscina = new Piscina({
    filename: `${currentFolder}/${workerFileName}`
});

async function joinImages(images) {
    try {
        const result = await piscina.run(images);
        return result;
    } catch (err) {
        console.error('error', err);
    }
    // return new Promise((resolve, reject) => {
    //     const worker = new Worker(`${currentFolder}/${workerFileName}`);
    //     worker.postMessage(images);
    //     worker.on('message', resolve);
    //     worker.on('error', reject);
    //     worker.once('exit', (code) => {
    //         if (code !== 0) {
    //             return reject(
    //                 new Error(
    //                     `Thread ${worker.threadId} stopped with exit code ${code}`
    //                 )
    //             );
    //         }
    //         console.log(`The thread ${worker.threadId} exited!`);
    //     });
    // });
}

async function handler(req, res) {
    if (req.url.includes('joinImages')) {
        const {
            query: { background, img },
        } = parse(req.url, true);
        const imageBase64 = await joinImages({
            image: img,
            background,
        });
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(
            `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`
        );
        return;
    }

    return res.end('ok');
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

// http://localhost:3000/joinImages?img=https://ecoms1.com/9241/@v3/1646918579171-nezuko17.png&background=https://wallpaperaccess.com/full/815769.jpg

// https://i.pinimg.com/originals/a6/35/98/a635984c4a883ffb62d684586c7e2c03.png
// https://ecoms1.com/9241/@v3/1646918579171-nezuko17.png

// backgrounds
// https://wallpaperaccess.com/full/815769.jpg
// https://wallpapercave.com/wp/wp2771916.jpg
