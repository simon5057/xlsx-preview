import { Alignment, Fill, Font } from "exceljs";
export declare function genAlignment(alignment: Partial<Alignment>): string;
export declare function genFont(font: Partial<Font>): string;
export declare function genFill(fill: Fill): string;
export declare function genColor(argb: string): string;
