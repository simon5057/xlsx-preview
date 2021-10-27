import { uuid } from "../utils";

export const UUID = uuid();

export const EXCEL_SHEETS_CLS = `excel-sheets-${UUID}`;

export const TABLE_CLS = `table-${UUID}`;
export const TBODY_CLS = `tbody-${UUID}`;
export const SHEET_CLS = `sheet-${UUID}`;
export const SHEET_TOGGLE_BAR_CLS = `sheet-toggle-bar-${UUID}`;
export const SHEET_LOCATE_BTN_X = `locate-btns-x-${UUID}`;
export const SHEET_LOCATE_BTN_CLS = `l-btn-${UUID}`;
export const SHEET_TOGGLE_BTN_X = `toggle-btns-x-${UUID}`;
export const SHEET_TOGGLE_BTN_CLS = `t-btn-${UUID}`;

export const CELL_HEIGHT = 24;
export const CELL_WIDTH = 72;
export const TABLE_BORDER_COLOR = "#f0f0f0";
export const ORDER_CELL_BACKGROUND = "#b6d9fb";

export const FIRST_ORDER_ROW_HEIGHT = 24;
export const FIRST_ORDER_COL_WIDTH = 32;

const DEFAULT_NUMBER_ROWS = 20;
const DEFAULT_NUMBER_COLS = 16;
export let MINIMUM_NUMBER_ROWS = DEFAULT_NUMBER_ROWS;
export let MINIMUM_NUMBER_COLS = DEFAULT_NUMBER_COLS;

export function setMinimumNumberRows(count: number) {
  if (count < DEFAULT_NUMBER_ROWS) {
    console.warn("setMinimumNumberRows: count less then DEFAULT_NUMBER_ROWS.");
  }
  MINIMUM_NUMBER_ROWS = count;
}

export function setMinimumNumberCols(count: number) {
  if (count < DEFAULT_NUMBER_COLS) {
    console.warn("setMinimumNumberCols: count less then DEFAULT_NUMBER_COLS.");
  }
  MINIMUM_NUMBER_COLS = count;
}
