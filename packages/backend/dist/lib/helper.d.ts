import { ServerResponse } from "http";
import { IncomingMessageWithBody } from "../types";
export declare function sendResponse(res: ServerResponse<IncomingMessageWithBody>, status: number, data: object): void;
export declare function setCors(res: ServerResponse<IncomingMessageWithBody>): void;
