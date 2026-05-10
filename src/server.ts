import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // url
    const url = req.url;
    // method
    const method = req.method;

    if (url === "/" && method === "GET") {
      //console.log(`you are on ${url} and method is ${method}`);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is root route" }));
    } else if (url?.startsWith("/product")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is product route" }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  },
);

server.listen(5000, () => {
  console.log(`server is running on the 5000 port`);
});
