import { Units } from "@unitconverter/common";
export declare class Converter {
    static convertRules: Map<Units, Map<Units, (amount: number) => number>>;
    static convert(from: Units, to: Units, amount: number): number;
}
