import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) =>{
    console.log(req)
})

server.listen(6000,() =>{
    console.log(`server is running on the 6000 port`)
})