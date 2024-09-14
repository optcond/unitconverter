"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = requestHandler;
const router_1 = require("./router");
const helper_1 = require("../lib/helper");
const routes_1 = require("./routes");
function requestHandler(req, res) {
    (0, helper_1.setCors)(res);
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    if (req.method !== "POST") {
        (0, helper_1.sendResponse)(res, 400, { error: `Only POST requests accepted` });
        return;
    }
    if (req.headers["content-type"] !== "application/json") {
        (0, helper_1.sendResponse)(res, 400, { error: `Not a JSON. Only JSON accepted` });
        return;
    }
    let chunkContent = "";
    req.on("data", (chunk) => {
        chunkContent += chunk;
    });
    req.on("end", () => {
        try {
            req.body = JSON.parse(chunkContent);
        }
        catch (error) {
            (0, helper_1.sendResponse)(res, 400, {
                error: `Bad JSON: ${error.message}`,
            });
            return;
        }
        (0, router_1.router)(routes_1.routes, req, res);
    });
}
