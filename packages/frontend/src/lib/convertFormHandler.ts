import { v4 as uuidv4 } from "uuid";
import {
  ReqConvertPayload,
  Unit,
  RespConvertPayload,
  RespErrorPayload,
} from "@unitconverter/common";
import { sendRequest } from "../api/apiHandler";

function validateForm(data: Record<string, any>): boolean {
  if (data.type && data.from && data.to && data.value) {
    return true;
  }
  return false;
}

export async function handleConvertForm(
  form: HTMLFormElement
): Promise<RespConvertPayload<any> | RespErrorPayload> {
  const formData = new FormData(form);

  const data = {
    type: formData.get("unitType") as keyof Unit,
    from: formData.get("from"),
    to: formData.get("to"),
    value: formData.get("amount"),
  };

  if (validateForm(data)) {
    const id = uuidv4();
    const requestData = {
      ...data,
      id,
    } as ReqConvertPayload<typeof data.type>;

    try {
      const response = await sendRequest("convert", requestData);
      const body = await response.json();

      return body as RespConvertPayload<typeof data.type> | RespErrorPayload;
    } catch (err) {
      throw new Error(`Request failure: ${(err as Error).message}`);
    }
  } else {
    throw new Error(`Invalid form data supplied`);
  }
}
