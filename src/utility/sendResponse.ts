import type { ServerResponse } from "node:http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  message: string,
  statusCode: number,
  data?: any,
) => {
  const response = {
    statusCode,
    success,
    message,
    data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
