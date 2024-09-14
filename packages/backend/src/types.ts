import { IncomingMessage, ServerResponse } from "http";

export interface IncomingMessageWithBody extends IncomingMessage {
  body?: Record<string, any>;
}

export interface Routes {
  [key: string]: (
    req: IncomingMessageWithBody,
    res: ServerResponse<IncomingMessageWithBody>
  ) => void;
}
