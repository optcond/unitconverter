import { ServerResponse } from "http";
import { router } from "../../../src/handlers/router";
import { IncomingMessageWithBody, Routes } from "../../../src/types";
import { sendResponse } from "../../../src/lib/helper";

jest.mock("../../../src/lib/helper", () => ({
  sendResponse: jest.fn(),
}));

describe(`Router paths test`, () => {
  let routes: Routes;
  beforeEach(() => {
    routes = {
      "/test": jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`check existing path`, () => {
    router(
      routes,
      { url: "/test" } as IncomingMessageWithBody,
      {} as ServerResponse<IncomingMessageWithBody>
    );
    expect(routes["/test"]).toHaveBeenCalledWith({ url: "/test" }, {});
  });
  it(`check non-existent path`, () => {
    router(
      routes,
      { url: "/unknown" } as IncomingMessageWithBody,
      {} as ServerResponse<IncomingMessageWithBody>
    );
    expect(sendResponse).toHaveBeenCalledWith({}, 400, {
      error: `Bad route`,
    });
  });
});
