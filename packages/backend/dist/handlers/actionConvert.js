"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionConvert = actionConvert;
const common_1 = require("@unitconverter/common");
const converter_1 = require("../core/converter");
const helper_1 = require("../lib/helper");
function actionConvert(req, res) {
    if ((0, common_1.isReqConvertPayload)(req.body)) {
        let result;
        try {
            result = converter_1.Converter.convert(req.body.from, req.body.to, parseFloat(req.body.value)).toString();
        }
        catch (error) {
            (0, helper_1.sendResponse)(res, 400, { error: error.message });
            return;
        }
        (0, helper_1.sendResponse)(res, 200, {
            ...req.body,
            result,
        });
        return;
    }
    else {
        (0, helper_1.sendResponse)(res, 400, { error: `Bad request format` });
        return;
    }
}
