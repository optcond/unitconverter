"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const common_1 = require("@unitconverter/common");
class Converter {
    static convertRules = new Map([
        // Weight rules
        [
            common_1.WeightUnits.Gram,
            new Map([
                [common_1.WeightUnits.Kilogram, (amount) => amount / 1000],
                [common_1.WeightUnits.Milligram, (amount) => amount * 1000],
            ]),
        ],
        [
            common_1.WeightUnits.Kilogram,
            new Map([
                [common_1.WeightUnits.Gram, (amount) => amount * 1000],
                [common_1.WeightUnits.Milligram, (amount) => amount * 1000 * 1000],
            ]),
        ],
        // Temperature rules
        [
            common_1.TemperatureUnits.Celsius,
            new Map([[common_1.TemperatureUnits.Kelvin, (amount) => amount + 273.15]]),
        ],
        [
            common_1.TemperatureUnits.Kelvin,
            new Map([[common_1.TemperatureUnits.Celsius, (amount) => amount - 273.15]]),
        ],
        // Length rules
        [
            common_1.LengthUnits.Centimeter,
            new Map([[common_1.LengthUnits.Meter, (amount) => amount / 100]]),
        ],
        [
            common_1.LengthUnits.Meter,
            new Map([[common_1.LengthUnits.Centimeter, (amount) => amount * 100]]),
        ],
    ]);
    static convert(from, to, amount) {
        const rule = Converter.convertRules.get(from)?.get(to);
        if (!rule)
            throw new Error(`No rule for chosen unit pair`);
        return rule(amount);
    }
}
exports.Converter = Converter;
