import type { IncomingMessage, ServerResponse } from "node:http";
import type { Product } from "../types/productTypes";
import { parseBody } from "../utility/parseBody";
import {
  insertProduct,
  readProduct,
} from "../services/products/productServices";

export const productController = async (
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
  // get-all-products
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
  }
  // get-singleProduct
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: Product) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is product route", data: product }),
    );
  }
  // post-aProduct
  else if (method === "POST" && url === "/products") {
    const products = readProduct();
    const body = await parseBody(req);
    const newProduct = body;
    products.push(newProduct);
    // new productList updating
    insertProduct(products);
    // console.log(body);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Added Successfully",
        data: newProduct,
      }),
    );
  }
  // edit a productController
  else if (method === "PUT" && id !== null) {
    const products = readProduct();
    const body = await parseBody(req);
    const indexOfProduct = products.findIndex((p: Product) => p?.id === id);
    if (indexOfProduct < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        }),
      );
    }
    products[indexOfProduct] = {
      id: products[indexOfProduct]?.id,
      ...body,
    };
    // insert in db
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Updated Successfully",
        data: products[indexOfProduct],
      }),
    );
  }
  // delete a product
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const indexOfProduct = products.findIndex((p: Product) => p.id === id);
    if (indexOfProduct < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        }),
      );
    }
    products.splice(indexOfProduct, 1)
    // insert updated product because one product is deleted
    insertProduct(products)
    res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Deleted Successfully",
        }),
      );
  }
};
