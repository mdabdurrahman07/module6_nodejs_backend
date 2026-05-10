import type { IncomingMessage, ServerResponse } from "node:http";
import type { Product } from "../types/productTypes";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";
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
    sendResponse(res, true, "This is products route", 200, products);
  }
  // get-singleProduct
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: Product) => p.id === id);
    if (!product) {
      sendResponse(res, false, "Product Not Found", 404);
      return;
    }
    sendResponse(res, true, "This is product route", 200, product);
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
    sendResponse(res, true, "Product Added Successfully", 200, newProduct);
  }
  // edit a productController
  else if (method === "PUT" && id !== null) {
    const products = readProduct();
    const body = await parseBody(req);
    const indexOfProduct = products.findIndex((p: Product) => p?.id === id);
    if (indexOfProduct < 0) {
      sendResponse(res, false, "Product Not Found", 404);
      return;
    }
    products[indexOfProduct] = {
      id: products[indexOfProduct]?.id,
      ...body,
    };
    // insert in db
    insertProduct(products);
    sendResponse(res, true, "Product Updated Successfully", 200, products[indexOfProduct]);
  }
  // delete a product
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const indexOfProduct = products.findIndex((p: Product) => p.id === id);
    if (indexOfProduct < 0) {
      sendResponse(res, false, "Product Not Found", 404);
      return;
    }
    products.splice(indexOfProduct, 1);
    // insert updated product because one product is deleted
    insertProduct(products);
    sendResponse(res, true, "Product Deleted Successfully", 200);
  }
};
