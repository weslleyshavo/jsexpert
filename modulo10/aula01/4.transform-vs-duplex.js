import { Duplex, Transform } from 'stream'

let count = 0;
const server = Duplex({
    objectMode: true, // para não precisar trabalhar com buffer => gasta mais memória
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Shavo[${count}]`)
                return;
            }
            clearInterval(intervalContext)
            this.push(null)
        }

        setInterval(function () { everySecond(this) })
    },
    // é como se fosse um objeto completamente diferente!
    write(chunk, enconding, cb) {
        console.log(`[writable] saving`, chunk)
        cb()
    }
})

// provar que são canais de comunicação diferentes!
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')

// on data ->  loga o que rolou no .push do reable
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa vc enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`)


// server
//     .pipe(process.stdout)

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, enconding, cb) {
        cb(null, chunk.toUpperCase())
    }
})

// transform é também um duplex, mas não possuem comunicação independente
transformToUpperCase.write('[transform] hello from write!')

// o push vai ignorar o que vc tem na função transform
transformToUpperCase.push('[transform] hello from push!\n')

server
    .pipe(transformToUpperCase)
    // redireciona todos os dados de readable para writable da duplex
    .pipe(server)