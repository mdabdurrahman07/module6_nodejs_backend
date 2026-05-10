import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";
import { sendResponse } from "../utility/sendResponse";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // url
  const url = req.url;
  // method
  const method = req.method;

  if (url === "/" && method === "GET") {
    //console.log(`you are on ${url} and method is ${method}`);
    sendResponse(res, true, "This is root route", 200);
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    sendResponse(res, false, "Route not found", 404);
  }
};
