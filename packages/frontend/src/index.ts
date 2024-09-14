import { isErrorPayload, isRespConvertPayload } from "@unitconverter/common";
import { handleConvertForm } from "./lib/convertFormHandler";
import { populateFromToFields, setResult, unitMapper } from "./lib/helper";

const converterForm = document.getElementById(
  "converter-form"
) as HTMLFormElement;
const resultBar = document.getElementById("result-bar");
const unitSelector = document.getElementById("unit-type") as HTMLSelectElement;
const fromSelector = document.getElementById("from") as HTMLSelectElement;
const toSelector = document.getElementById("to") as HTMLSelectElement;

if (unitSelector.value)
  populateFromToFields(
    fromSelector,
    toSelector,
    unitMapper[unitSelector.value as keyof typeof unitMapper]
  );

if (unitSelector && fromSelector && toSelector) {
  unitSelector.addEventListener("change", (ev) => {
    const unitType = unitSelector.value as keyof typeof unitMapper;
    const unit = unitMapper[unitType];

    populateFromToFields(fromSelector, toSelector, unit);
  });
}

if (converterForm && resultBar) {
  converterForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try {
      const payload = await handleConvertForm(ev.target as HTMLFormElement);
      if (isErrorPayload(payload)) {
        setResult(resultBar, `Server responded with error: ${payload.error}`);
      } else if (isRespConvertPayload(payload)) {
        setResult(
          resultBar,
          `Conversion: ${payload.value} ${payload.from} is ${payload.result} ${payload.to}`,
          "success"
        );
      }
    } catch (err) {
      setResult(resultBar, (err as Error).message);
    }
  });
}
