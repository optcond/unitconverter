import {
  Units,
  WeightUnits,
  LengthUnits,
  TemperatureUnits,
} from "@unitconverter/common";

export class Converter {
  static convertRules = new Map<Units, Map<Units, (amount: number) => number>>([
    // Weight rules
    [
      WeightUnits.Gram,
      new Map([
        [WeightUnits.Kilogram, (amount) => amount / 1000],
        [WeightUnits.Milligram, (amount) => amount * 1000],
      ]),
    ],
    [
      WeightUnits.Kilogram,
      new Map([
        [WeightUnits.Gram, (amount) => amount * 1000],
        [WeightUnits.Milligram, (amount) => amount * 1000 * 1000],
      ]),
    ],

    // Temperature rules
    [
      TemperatureUnits.Celsius,
      new Map([[TemperatureUnits.Kelvin, (amount) => amount + 273.15]]),
    ],
    [
      TemperatureUnits.Kelvin,
      new Map([[TemperatureUnits.Celsius, (amount) => amount - 273.15]]),
    ],

    // Length rules
    [
      LengthUnits.Centimeter,
      new Map([[LengthUnits.Meter, (amount) => amount / 100]]),
    ],
    [
      LengthUnits.Meter,
      new Map([[LengthUnits.Centimeter, (amount) => amount * 100]]),
    ],
  ]);
  static convert(from: Units, to: Units, amount: number) {
    const rule = Converter.convertRules.get(from)?.get(to);
    if (!rule) throw new Error(`No rule for chosen unit pair`);

    return rule(amount);
  }
}
