import {
  createServer,
  IncomingMessage,
  request,
  Server,
  ServerResponse,
} from "http";
import { requestHandler } from "../../src/handlers/requestHandler";
import { AddressInfo } from "net";
import {
  LengthUnits,
  ReqConvertPayload,
  RespConvertPayload,
} from "@unitconverter/common";

describe(`Testing server requests and routes`, () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let params: any;
  beforeAll((done) => {
    server = createServer(requestHandler);
    server.listen(1337, () => {
      let address = server.address() as AddressInfo;
      params = {
        hostname: address.address,
        port: address.port,
      };
      done();
    });
  });
  afterAll((done) => {
    server.close(done);
  });
  it(`Testing convert request with correct type and format`, (done) => {
    let body = JSON.stringify({
      from: LengthUnits.Centimeter,
      to: LengthUnits.Meter,
      id: "101",
      type: "Length",
      value: "100",
    } as ReqConvertPayload<"Length">);
    params = {
      ...params,
      path: "/convert",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": body.length,
      },
    };
    let con = request(params, (res) => {
      let content: string = "";
      res.on("data", (chunk) => {
        content += chunk;
      });
      res.on("end", () => {
        let body = JSON.parse(content);
        expect(body.error).not.toEqual("Bad route");
        expect(body.error).not.toEqual("Bad request format");
        expect(body).toEqual({
          from: LengthUnits.Centimeter,
          to: LengthUnits.Meter,
          id: "101",
          type: "Length",
          value: "100",
          result: "1",
        } as RespConvertPayload<"Length">);
        done();
      });
    });
    con.on("error", (err) => {
      done(err);
    });
    con.write(body);
    con.end();
  });
});
