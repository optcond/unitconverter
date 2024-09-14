"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const helper_1 = require("../lib/helper");
function router(routes, req, res) {
    if (req.url && req.url in routes) {
        routes[req.url](req, res);
    }
    else {
        (0, helper_1.sendResponse)(res, 400, { error: `Bad route` });
        return;
    }
}
