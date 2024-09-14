import { ReqConvertPayload, RespConvertPayload, RespErrorPayload, Unit } from "../types";
export declare function isReqConvertPayload<T extends keyof Unit>(request: any): request is ReqConvertPayload<T>;
export declare function isRespConvertPayload<T extends keyof Unit>(response: any): response is RespConvertPayload<T>;
export declare function isErrorPayload(response: any): response is RespErrorPayload;
