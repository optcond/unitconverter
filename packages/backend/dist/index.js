"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const requestHandler_1 = require("./handlers/requestHandler");
const server = http_1.default.createServer(requestHandler_1.requestHandler);
server.listen(1337, () => {
    console.log(`Server listening`);
});
