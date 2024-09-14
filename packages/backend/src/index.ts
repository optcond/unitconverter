import http from "http";
import { requestHandler } from "./handlers/requestHandler";

const server = http.createServer(requestHandler);

server.listen(1337, () => {
  console.log(`Server listening`);
});
