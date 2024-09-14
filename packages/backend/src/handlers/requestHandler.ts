import { ServerResponse } from "http";
import { router } from "./router";
import { sendResponse, setCors } from "../lib/helper";
import { IncomingMessageWithBody } from "../types";
import { routes } from "./routes";

export function requestHandler(
  req: IncomingMessageWithBody,
  res: ServerResponse<IncomingMessageWithBody>
) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendResponse(res, 400, { error: `Only POST requests accepted` });
    return;
  }

  if (req.headers["content-type"] !== "application/json") {
    sendResponse(res, 400, { error: `Not a JSON. Only JSON accepted` });
    return;
  }

  let chunkContent: string = "";
  req.on("data", (chunk) => {
    chunkContent += chunk;
  });

  req.on("end", () => {
    try {
      req.body = JSON.parse(chunkContent);
    } catch (error) {
      sendResponse(res, 400, {
        error: `Bad JSON: ${(error as Error).message}`,
      });
      return;
    }

    router(routes, req, res);
  });
}
