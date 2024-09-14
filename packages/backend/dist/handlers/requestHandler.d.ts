import { ServerResponse } from "http";
import { IncomingMessageWithBody } from "../types";
export declare function requestHandler(req: IncomingMessageWithBody, res: ServerResponse<IncomingMessageWithBody>): void;
