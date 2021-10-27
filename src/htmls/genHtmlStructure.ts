import { Worksheet } from "exceljs";
import {
  SHEET_TOGGLE_BTN_CLS,
  SHEET_TOGGLE_BTN_X,
  SHEET_CLS,
  TABLE_CLS,
  TBODY_CLS,
  UUID,
  EXCEL_SHEETS_CLS,
  SHEET_LOCATE_BTN_X,
  SHEET_LOCATE_BTN_CLS,
  SHEET_TOGGLE_BAR_CLS,
} from "../constants/base";
import { genToggleSheetCSS } from "../CSSStyles/base";
import genScripts from "./genScripts";

const EMPTY_ROW_CACHE: { [key: number]: string } = {};
export function genEmptyRow(columns: number, orderCell: string): string {
  if (EMPTY_ROW_CACHE[columns])
    return `<tr>${orderCell}${EMPTY_ROW_CACHE[columns]}</tr>`;
  let cells = "";
  for (let i = 1; i <= columns; i++) {
    cells += `<td></td>`;
  }
  EMPTY_ROW_CACHE[columns] = cells;
  return `<tr>${orderCell}${cells}</tr>`;
}

export function wrapTable(html: string): string {
  return `<body class="embed-body-${UUID}">
        <table class="${TABLE_CLS}">
            <tbody class="${TBODY_CLS}">${html}</tbody>
        </table>
    </body>`;
}

export function sheetsInAll(sheets: string[], workSheet: Worksheet[]) {
  let html = "";
  let buttons = "";
  for (let i = 0; i < sheets.length; i++) {
    const MIME_TYPE = "text/html";
    const url = URL.createObjectURL(new Blob([sheets[i]], { type: MIME_TYPE }));
    const active = i === 0 ? " active" : "";
    html += `<object class="${SHEET_CLS}${active}" data-index="${i}" type="${MIME_TYPE}" data="${url}"></object>`;
    buttons += `<button class="${SHEET_TOGGLE_BTN_CLS}${active}" data-index="${i}">${workSheet[i].name}</button>`;
  }
  const locateBtns = `<div class="${SHEET_LOCATE_BTN_X}">
    <button class="${SHEET_LOCATE_BTN_CLS}" id="first-${UUID}">⇤</button>
    <button class="${SHEET_LOCATE_BTN_CLS}" id="prev-${UUID}">←</button>
    <button class="${SHEET_LOCATE_BTN_CLS}" id="next-${UUID}">→</button>
    <button class="${SHEET_LOCATE_BTN_CLS}" id="last-${UUID}">⇥</button>
  </div>`;
  const toggleBtns = `<div class="${SHEET_TOGGLE_BTN_X}">${buttons}</div>`;
  html += `<div class="${SHEET_TOGGLE_BAR_CLS}">${locateBtns}${toggleBtns}</div>`;
  html += `${genToggleSheetCSS()}${genScripts()}`;
  return `<div class="${EXCEL_SHEETS_CLS}">${html}</div>`;
}
