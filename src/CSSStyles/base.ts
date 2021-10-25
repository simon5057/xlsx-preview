import {
  SHEET_BTN_CLS,
  TOGGLE_SHEET_BTN_X,
  TABLE_BORDER_COLOR,
  CELL_HEIGHT,
  CELL_WIDTH,
  SHEET_CLS,
  TABLE_CLS,
  TBODY_CLS,
  UUID,
  EXCEL_SHEETS_CLS,
  ORDER_CELL_BACKGROUND,
} from "../constants/base";

export function genBaseCSS(): string {
  const base = `
    <style>
      .embed-body-${UUID} { margin: 0; padding: 0; }
      .${TABLE_CLS} { border-collapse: collapse; table-layout: fixed; }
      .${TBODY_CLS} { border-right: 1px solid ${TABLE_BORDER_COLOR}; border-bottom: 1px solid ${TABLE_BORDER_COLOR}; }
      .${TBODY_CLS} td { border-left: 1px solid ${TABLE_BORDER_COLOR}; border-top: 1px solid ${TABLE_BORDER_COLOR}; width: ${CELL_WIDTH}px; height: ${CELL_HEIGHT}px; }
      .${TBODY_CLS} td.order { color: #333; text-align: center; background: ${ORDER_CELL_BACKGROUND}; }
      .${TBODY_CLS} td.order-row { width: 32px; }
    </style>`;
  return base;
}

export function genToggleSheetCSS(): string {
  return `
    <style>
      .${EXCEL_SHEETS_CLS} { position: relative; padding-bottom: 26px; }
      .${SHEET_CLS} { display: none; width: 100%; height: 100%; }
      .${SHEET_CLS}.active { display: block; }
      .${TOGGLE_SHEET_BTN_X} { position: fixed; left: 0px; bottom: 0px; display: flex; }
      .${SHEET_BTN_CLS} { height: 30px; padding: 0 15px; border: none; box-shadow: 1px 0 2px #ccc; }
      .${SHEET_BTN_CLS}.active { border-bottom: 2px solid; background: #fff; }
    </style>`;
}
