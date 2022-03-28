import Http from 'http';

let count = 1;
async function handler(req, res) {
  count++;
  try {
    if (count % 2 === 0) await Promise.reject('error dentro do handler!');

    for await (const data of req) {
      try {
        if (count % 2 !== 0) await Promise.reject('error dentro do for!');
        res.end();
      } catch (err) {
        console.error('a request error has happened', err);
        res.writeHead(500);
        res.write(JSON.stringify({ message: 'internal server error!' }));
        res.end();
      }
    }
  } catch (err) {
    console.error('a server error has happened', err);
    res.writeHead(500);
    res.write(JSON.stringify({ message: 'internal server error!' }));
    res.end();
  }
}

Http.createServer(handler).listen(3000, () => console.log('running at 3000'));
