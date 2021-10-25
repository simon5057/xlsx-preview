import { Worksheet } from "exceljs";
import {
  SHEET_BTN_CLS,
  TOGGLE_SHEET_BTN_X,
  SHEET_CLS,
  TABLE_CLS,
  TBODY_CLS,
  UUID,
  EXCEL_SHEETS_CLS,
} from "../constants/base";
import { genToggleSheetCSS } from "../CSSStyles/base";

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
    buttons += `<button class="${SHEET_BTN_CLS}${active}" data-index="${i}">${workSheet[i].name}</button>`;
  }
  html += `<div class="${TOGGLE_SHEET_BTN_X}">${buttons}</div>`;
  html += `${genToggleSheetCSS()}${genScripts()}`;
  return `<div class="${EXCEL_SHEETS_CLS}">${html}</div>`;
}

function genScripts() {
  return `<script>
    window.onload = function() {
      const buttonBox = document.querySelector('.${TOGGLE_SHEET_BTN_X}');
      buttonBox.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('${SHEET_BTN_CLS}')) {
          const sheets = document.querySelectorAll('.${SHEET_CLS}');
          for (let node of sheets) {
            node.classList.remove('active');
          }
          for (let btn of buttonBox.children) {
            btn.classList.remove('active');
          }
          const index = target.dataset.index;
          document.querySelector('.${SHEET_CLS}[data-index="'+index+'"]').classList.add('active');
          e.target.classList.add('active');
        }
      })
    }
  </script>`;
}
