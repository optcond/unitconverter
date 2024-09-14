import { ServerResponse } from "http";
import { sendResponse } from "../lib/helper";
import { IncomingMessageWithBody, Routes } from "../types";

export function router(
  routes: Routes,
  req: IncomingMessageWithBody,
  res: ServerResponse<IncomingMessageWithBody>
) {
  if (req.url && req.url in routes) {
    routes[req.url](req, res);
  } else {
    sendResponse(res, 400, { error: `Bad route` });
    return;
  }
}
