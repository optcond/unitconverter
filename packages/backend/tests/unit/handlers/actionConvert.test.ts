import { ServerResponse } from "http";
import { actionConvert } from "../../../src/handlers/actionConvert";
import { sendResponse } from "../../../src/lib/helper";
import { IncomingMessageWithBody } from "../../../src/types";
import { LengthUnits, WeightUnits } from "@unitconverter/common";
import { Converter } from "../../../src/core/converter";

jest.mock("../../../src/lib/helper", () => ({
  sendResponse: jest.fn(),
}));

jest.mock("../../../src/core/converter", () => ({
  Converter: {
    convert: jest.fn(),
  },
}));

describe(`Action convert testing`, () => {
  let req: IncomingMessageWithBody;
  let res: ServerResponse<IncomingMessageWithBody>;
  beforeEach(() => {
    req = {} as IncomingMessageWithBody;
    res = {} as ServerResponse<IncomingMessageWithBody>;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`handle bad body format`, () => {
    req.body = {
      from: "bad-from",
    };
    actionConvert(req, res);
    expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 400, {
      error: `Bad request format`,
    });
  });

  it(`handle Convert lib exception`, () => {
    (Converter.convert as jest.Mock).mockImplementation(() => {
      throw new Error(`Convert error`);
    });
    req.body = {
      from: LengthUnits.Centimeter,
      to: WeightUnits.Kilogram,
      value: "100.5",
      id: "5",
      type: LengthUnits,
    };
    actionConvert(req, res);

    expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 400, {
      error: "Convert error",
    });
  });

  it(`handle correct convertion & response`, () => {
    (Converter.convert as jest.Mock).mockReturnValue(200);
    req.body = {
      from: LengthUnits.Centimeter,
      to: WeightUnits.Kilogram,
      value: "100.5",
      id: "5",
      type: LengthUnits,
    };
    actionConvert(req, res);

    expect(Converter.convert).toHaveBeenCalledWith(
      LengthUnits.Centimeter,
      WeightUnits.Kilogram,
      100.5
    );
    expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 200, {
      from: LengthUnits.Centimeter,
      to: WeightUnits.Kilogram,
      value: "100.5",
      id: "5",
      type: LengthUnits,
      result: "200",
    });
  });
});
