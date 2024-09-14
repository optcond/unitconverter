export declare enum LengthUnits {
    Millimeter = "millimeter",
    Centimeter = "centimeter",
    Meter = "meter",
    Kilometer = "kilometer",
    Inch = "inch",
    Foot = "foot",
    Yard = "yard",
    Mile = "mile"
}
export declare enum WeightUnits {
    Milligram = "milligram",
    Gram = "gram",
    Kilogram = "kilgoram",
    Ounce = "ounce",
    Pound = "pound"
}
export declare enum TemperatureUnits {
    Celsius = "celsius",
    Fahrenheit = "farenheit",
    Kelvin = "kelvin"
}
export type Units = LengthUnits | WeightUnits | TemperatureUnits;
export interface Unit {
    Length: LengthUnits;
    Weight: WeightUnits;
    Temp: TemperatureUnits;
}
export interface ReqConvertPayload<T extends keyof Unit> {
    id: string;
    type: T;
    from: Unit[T];
    to: Unit[T];
    value: string;
}
export interface RespConvertPayload<T extends keyof Unit> extends ReqConvertPayload<T> {
    result: string;
}
export interface RespErrorPayload {
    error: string;
}
