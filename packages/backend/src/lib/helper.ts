import { ServerResponse } from "http";
import { IncomingMessageWithBody } from "../types";

export function sendResponse(
  res: ServerResponse<IncomingMessageWithBody>,
  status: number,
  data: object
) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function setCors(res: ServerResponse<IncomingMessageWithBody>) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
