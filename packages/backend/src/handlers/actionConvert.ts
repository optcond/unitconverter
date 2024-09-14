import { isReqConvertPayload, RespConvertPayload } from "@unitconverter/common";
import { ServerResponse } from "http";
import { Converter } from "../core/converter";
import { IncomingMessageWithBody } from "../types";
import { sendResponse } from "../lib/helper";

export function actionConvert(
  req: IncomingMessageWithBody,
  res: ServerResponse<IncomingMessageWithBody>
): void {
  if (isReqConvertPayload(req.body)) {
    let result: string;
    try {
      result = Converter.convert(
        req.body.from,
        req.body.to,
        parseFloat(req.body.value)
      ).toString();
    } catch (error) {
      sendResponse(res, 400, { error: (error as Error).message });
      return;
    }

    sendResponse(res, 200, {
      ...req.body,
      result,
    } as RespConvertPayload<typeof req.body.type>);
    return;
  } else {
    sendResponse(res, 400, { error: `Bad request format` });
    return;
  }
}
