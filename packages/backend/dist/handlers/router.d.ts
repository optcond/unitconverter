import { ServerResponse } from "http";
import { IncomingMessageWithBody, Routes } from "../types";
export declare function router(routes: Routes, req: IncomingMessageWithBody, res: ServerResponse<IncomingMessageWithBody>): void;
