"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReqConvertPayload = isReqConvertPayload;
exports.isRespConvertPayload = isRespConvertPayload;
exports.isErrorPayload = isErrorPayload;
function isReqConvertPayload(request) {
    return (typeof request === "object" &&
        request !== null &&
        "type" in request &&
        "id" in request &&
        "from" in request &&
        "to" in request);
}
function isRespConvertPayload(response) {
    return (typeof response === "object" &&
        response !== null &&
        "type" in response &&
        "id" in response &&
        "from" in response &&
        "to" in response &&
        "result" in response);
}
function isErrorPayload(response) {
    return (typeof response === "object" && response !== null && "error" in response);
}
