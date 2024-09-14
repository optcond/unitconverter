import { ServerResponse } from "http";
import { requestHandler } from "../../../src/handlers/requestHandler";
import { sendResponse } from "../../../src/lib/helper";
import { IncomingMessageWithBody } from "../../../src/types";
import { router } from "../../../src/handlers/router";
import { routes } from "../../../src/handlers/routes";
import { EventEmitter } from "stream";

jest.mock("../../../src/lib/helper", () => ({
  sendResponse: jest.fn(),
}));
jest.mock("../../../src/handlers/router", () => ({
  router: jest.fn(),
}));
jest.mock("../../../src/handlers/routes", () => ({
  routes: "testing",
}));

describe(`Sever request event handling`, () => {
  let req: any;
  let res: ServerResponse<IncomingMessageWithBody>;
  beforeEach(() => {
    req = new EventEmitter();
    res = {} as ServerResponse<IncomingMessageWithBody>;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should handle bad content type`, () => {
    req.headers = { "content-type": "application/text" };
    requestHandler(req, res);

    expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 400, {
      error: `Not a JSON. Only JSON accepted`,
    });
  });

  it(`should handle other than POST request`, () => {
    req.headers = { "content-type": "application/json" };
    req.method = "GET";
    requestHandler(req, res);

    expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 400, {
      error: `Only POST requests accepted`,
    });
  });
  it(`should handle bad json`, (done) => {
    req.headers = { "content-type": "application/json" };
    req.method = "POST";

    const res = {} as ServerResponse<IncomingMessageWithBody>;
    requestHandler(req, res);

    req.emit("data", "{bad json}");
    req.emit("end");

    setImmediate(() => {
      expect(sendResponse).toHaveBeenCalledWith(
        expect.anything(),
        400,
        expect.objectContaining({
          error: expect.stringContaining("Bad JSON"),
        })
      );
      done();
    });
  });
  it(`should handle valid JSON request`, (done) => {
    req.headers = { "content-type": "application/json" };
    req.method = "POST";

    const res = {} as ServerResponse<IncomingMessageWithBody>;
    requestHandler(req, res);

    req.emit("data", JSON.stringify({ my: "value" }));
    req.emit("end");

    setImmediate(() => {
      expect(sendResponse).not.toHaveBeenCalled();
      expect(router).toHaveBeenCalledWith(routes, req, res);
      expect(req.body).toEqual({ my: "value" });
      done();
    });
  });
});
