import { createServer } from 'http';
import BusinessError from './errors/businessError.js';
import { statusCodes } from './util/httpStatusCodes.js';

function validateHero(hero) {
  //simulando um outro erro, por exemplo de banco de dados
  if (Reflect.has(hero, 'connectionError')) {
    // só um erro genérico para trazer outro cenário de erro inexperado
    throw new Error('error connecting to DB!');
  }
  
  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!');
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name length must be higher than 4!');
  }
}
async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      res.writeHead(statusCodes.OK);
      res.end();
    } catch (err) {
      if (err instanceof BusinessError) {
        res.writeHead(statusCodes.BAD_REQUEST);
        res.end(err.message);
        continue;
      }

      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      res.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

/*
  curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}'
*/
