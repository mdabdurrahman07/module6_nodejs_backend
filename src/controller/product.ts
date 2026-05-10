import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../services/products/readProduct";
import type { Product } from "../types/productTypes";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // url
  const url = req.url;
  // method
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log(id);

  if (url === "/products" && method === "GET") {
    // const products = [
    //   {
    //     id: 1,
    //     productName: "P-1",
    //   },
    //   {
    //     id: 2,
    //     productName: "P-2",
    //   },
    //   {
    //     id: 3,
    //     productName: "P-3",
    //   },
    // ];
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is products route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: Product) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is products route", data: product }),
    );
  }
};
