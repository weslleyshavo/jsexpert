InjectHttpInterceptor()

import http from 'http'
import { InjectHttpInterceptor } from '../index.js'

function handleRequest(resquest, response) {
    // response.setHeader('X-Instrumented-By', 'WeslleyShavo')
    response.end('Hello world!')
}

const server = http.createServer(handleRequest)
const port = 3000

server.listen(port, () => console.log(`server running at`, server.address().port))