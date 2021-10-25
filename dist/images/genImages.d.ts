import { Worksheet } from "exceljs";
import { RowsAndColsSpanMap } from "../types/table";
export declare function genImageHtml(workSheet: Worksheet, positionMap: RowsAndColsSpanMap): Promise<string>;
