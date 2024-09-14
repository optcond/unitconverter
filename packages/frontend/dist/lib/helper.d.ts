import { LengthUnits, TemperatureUnits, WeightUnits } from "@unitconverter/common";
export declare const unitMapper: {
    length: typeof LengthUnits;
    weight: typeof WeightUnits;
    temperature: typeof TemperatureUnits;
};
export declare function setResult(element: HTMLElement, message: string, type?: "success" | "danger"): void;
export declare function populateFromToFields(fromSelector: HTMLSelectElement, toSelector: HTMLSelectElement, unit: typeof LengthUnits | typeof WeightUnits | typeof TemperatureUnits): void;
