import { Config } from "../config";

export async function sendRequest(path: string, data: any): Promise<Response> {
  return fetch(`${Config.API_URL}/${path}`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
}
