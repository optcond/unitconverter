import {
  LengthUnits,
  TemperatureUnits,
  Unit,
  WeightUnits,
} from "@unitconverter/common";

export const unitMapper = {
  length: LengthUnits,
  weight: WeightUnits,
  temperature: TemperatureUnits,
};

export function setResult(
  element: HTMLElement,
  message: string,
  type: "success" | "danger" = "danger"
): void {
  element.classList.remove("d-none", "alert-danger", "alert-success");
  if (type === "danger") {
    element.classList.add("alert-danger");
  } else if (type === "success") {
    element.classList.add("alert-success");
  }
  element.textContent = message;
}

export function populateFromToFields(
  fromSelector: HTMLSelectElement,
  toSelector: HTMLSelectElement,
  unit: typeof LengthUnits | typeof WeightUnits | typeof TemperatureUnits
) {
  fromSelector.innerHTML = "";
  toSelector.innerHTML = "";

  Object.entries(unit).forEach(([key, value]) => {
    fromSelector.add(new Option(key, value));
    toSelector.add(new Option(key, value));
  });
}
