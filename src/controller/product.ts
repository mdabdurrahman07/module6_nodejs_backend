import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../services/products/readProduct";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // url
  const url = req.url;
  // method
  const method = req.method;
  if (url === "/product" && method === "GET") {
    const products = [
      {
        id: 1,
        productName: "P-1",
      },
      {
        id: 2,
        productName: "P-2",
      },
      {
        id: 3,
        productName: "P-3",
      },
    ];
    readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is product route", data: products }),
    );
  }
};
