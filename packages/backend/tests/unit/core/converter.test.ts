import { LengthUnits, WeightUnits } from "@unitconverter/common";
import { Converter } from "../../../src/core/converter";

describe(`Converter`, () => {
  it(`ok tests`, () => {
    expect(
      Converter.convert(WeightUnits.Kilogram, WeightUnits.Gram, 1)
    ).toEqual(1000);
    expect(
      Converter.convert(LengthUnits.Centimeter, LengthUnits.Meter, 1)
    ).toEqual(0.01);
  });
  it(`fail test`, () => {
    expect(() =>
      Converter.convert(WeightUnits.Kilogram, LengthUnits.Foot, 1)
    ).toThrow(`No rule for chosen unit pair`);
  });
});
