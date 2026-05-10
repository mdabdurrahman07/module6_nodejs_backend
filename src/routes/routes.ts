import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // url
  const url = req.url;
  // method
  const method = req.method;

  if (url === "/" && method === "GET") {
    //console.log(`you are on ${url} and method is ${method}`);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/product")) {
    productController(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};
