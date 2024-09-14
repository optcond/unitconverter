import {
  ReqConvertPayload,
  RespConvertPayload,
  RespErrorPayload,
  Unit,
} from "../types";

export function isReqConvertPayload<T extends keyof Unit>(
  request: any
): request is ReqConvertPayload<T> {
  return (
    typeof request === "object" &&
    request !== null &&
    "type" in request &&
    "id" in request &&
    "from" in request &&
    "to" in request
  );
}

export function isRespConvertPayload<T extends keyof Unit>(
  response: any
): response is RespConvertPayload<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "type" in response &&
    "id" in response &&
    "from" in response &&
    "to" in response &&
    "result" in response
  );
}

export function isErrorPayload(response: any): response is RespErrorPayload {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}
