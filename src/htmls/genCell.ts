import {
  Cell,
  CellHyperlinkValue,
  CellRichTextValue,
  ValueType,
} from "exceljs";
import { genAlignment, genFill, genFont } from "../CSSStyles/inline";
import { CellSpan } from "../types/table";
import { genDate, genHyperLink, genRichText } from "./genText";

function genCellTextByType(cell: Cell): string {
  const { type, value } = cell;
  switch (type) {
    case ValueType.Hyperlink:
      return genHyperLink(value as CellHyperlinkValue);
    case ValueType.RichText:
      return genRichText(value as CellRichTextValue);
    case ValueType.Date:
      return genDate(value as Date);
    default:
      return (value as string) || "";
  }
}

function computedCellSpan(cell: Cell) {
  if (!cell.isMerged || cell.master !== cell) return null;
  const { row, col } = cell.fullAddress;
  // find the next merged cell
  let nextRow = row + 1;
  let nextCell: Cell | undefined;
  do {
    nextCell = cell.worksheet.findCell(nextRow++, col);
  } while (nextCell && nextCell.master === cell);
  let nextCol = col + 1;
  nextCell = undefined;
  do {
    nextCell = cell.worksheet.findCell(row, nextCol++);
  } while (nextCell && nextCell.master === cell);
  const cellSpan: CellSpan = {};
  if (nextRow - row > 1) {
    cellSpan.row = nextRow - row - 1;
  }
  if (nextCol - col > 1) {
    cellSpan.col = nextCol - col - 1;
  }
  return cellSpan;
}

export function genCell(cell: Cell) {
  let colRowData: CellSpan | null = null;
  if (cell.isMerged) {
    // If cell is merged and it isn't the master.
    if (cell.master !== cell) return "";
    colRowData = computedCellSpan(cell);
  }
  let text = genCellTextByType(cell);
  let cellAttrs = "";
  if (colRowData) {
    if (colRowData.col) cellAttrs += ` colspan="${colRowData.col}"`;
    if (colRowData.row) cellAttrs += ` rowspan="${colRowData.row}"`;
  }
  let curCellStyle = "";
  if (cell.font) curCellStyle += genFont(cell.font);
  if (cell.alignment) curCellStyle += genAlignment(cell.alignment);
  if (cell.fill) curCellStyle += genFill(cell.fill);
  if (curCellStyle) cellAttrs += ` style="${curCellStyle}"`;
  return `<td${cellAttrs}>${text}</td>`;
}
