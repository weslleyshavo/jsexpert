import { createServer } from 'http';
import HeroEntity from './heroEntity.js';
import { statusCodes } from './util/httpStatusCodes.js';

async function handler(req, res) {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data);
      //simulando um outro erro, por exemplo de banco de dados
      if (Reflect.has(parsedData, 'connectionError')) {
        // só um erro genérico para trazer outro cenário de erro inexperado
        throw new Error('error connecting to DB!');
      }
      const hero = new HeroEntity(parsedData);
      if (!hero.isValid()) {
        res.writeHead(statusCodes.BAD_REQUEST);
        res.end(hero.notifications.join('\n'));
        continue;
      }

      // cadastra no banco de dados...

      res.writeHead(statusCodes.OK);
      res.end();
    } catch (err) {
      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      res.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

/*
  curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}'
*/
