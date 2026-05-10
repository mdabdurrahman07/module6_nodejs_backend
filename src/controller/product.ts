import type { IncomingMessage, ServerResponse } from "node:http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // url
  const url = req.url;
  // method
  const method = req.method;
  if (url === "/product" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is product route" }));
  }
};
