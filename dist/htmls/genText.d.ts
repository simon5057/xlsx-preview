import { Cell, CellHyperlinkValue, CellRichTextValue } from "exceljs";
export declare function genHyperLink(value: CellHyperlinkValue): string;
export declare function genRichText(value: CellRichTextValue): string;
export declare function genForMulaValue(cell: Cell): string;
export declare function genDate(value: Date): string;
