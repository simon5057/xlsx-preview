import { Worksheet } from "exceljs";
export declare function genEmptyRow(columns: number, orderCell: string): string;
export declare function wrapTable(html: string): string;
export declare function sheetsInAll(sheets: string[], workSheet: Worksheet[]): string;
