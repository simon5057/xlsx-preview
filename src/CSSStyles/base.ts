import {
  SHEET_TOGGLE_BTN_CLS,
  SHEET_TOGGLE_BTN_X,
  TABLE_BORDER_COLOR,
  CELL_HEIGHT,
  CELL_WIDTH,
  SHEET_CLS,
  TABLE_CLS,
  TBODY_CLS,
  UUID,
  EXCEL_SHEETS_CLS,
  ORDER_CELL_BACKGROUND,
  SHEET_TOGGLE_BAR_CLS,
  SHEET_LOCATE_BTN_X,
  SHEET_LOCATE_BTN_CLS,
} from "../constants/base";

export function genBaseCSS(): string {
  const base = `
    <style>
      .embed-body-${UUID} { margin: 0; padding: 0; }
      .${TABLE_CLS} { border-collapse: collapse; table-layout: fixed; }
      .${TBODY_CLS} { border-right: 1px solid ${TABLE_BORDER_COLOR}; border-bottom: 1px solid ${TABLE_BORDER_COLOR}; }
      .${TBODY_CLS} td { border-left: 1px solid ${TABLE_BORDER_COLOR}; border-top: 1px solid ${TABLE_BORDER_COLOR}; width: ${CELL_WIDTH}px; height: ${CELL_HEIGHT}px; text-overflow: ellipsis; overflow: hidden; }
      .${TBODY_CLS} td.order { color: #333; text-align: center; background: ${ORDER_CELL_BACKGROUND}; }
      .${TBODY_CLS} td.order-row { width: 32px; }
    </style>`;
  return base;
}

export function genToggleSheetCSS(): string {
  return `
    <style>
      body { margin-bottom: 0; }
      .${EXCEL_SHEETS_CLS} { position: relative; }
      .${SHEET_CLS} { display: none; width: 100%; height: calc(100% - 30px); }
      .${SHEET_CLS}.active { display: block; }
      .${SHEET_TOGGLE_BAR_CLS} { position: fixed; left: 0px; bottom: 0px; width: 100%; display: flex; }
      .${SHEET_LOCATE_BTN_X} { display: flex; algin-items: center; margin-right: 1px; }
      .${SHEET_LOCATE_BTN_CLS} { height: 30px; border: none; }
      .${SHEET_LOCATE_BTN_CLS}:active { background: #fff; }
      .${SHEET_TOGGLE_BTN_X} { position: relative; flex: 1; overflow: hidden; white-space: nowrap; }
      .${SHEET_TOGGLE_BTN_CLS} { height: 30px; padding: 0 15px; border: none; box-shadow: 1px 0 2px #ccc; }
      .${SHEET_TOGGLE_BTN_CLS}.active { border-bottom: 2px solid; background: #fff; }
    </style>`;
}
