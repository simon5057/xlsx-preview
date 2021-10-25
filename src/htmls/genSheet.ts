import { Row, Worksheet } from "exceljs";
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  FIRST_ORDER_COL_WIDTH,
  FIRST_ORDER_ROW_HEIGHT,
  MINIMUM_NUMBER_COLS,
  MINIMUM_NUMBER_ROWS,
  TABLE_CLS,
  TBODY_CLS,
} from "../constants/base";
import { genBaseCSS } from "../CSSStyles/base";
import { genImageHtml } from "../images/genImages";
import { RowsAndColsSpanMap } from "../types/table";
import { genCell } from "./genCell";
import { genEmptyRow, wrapTable } from "./genHtmlStructure";

function genRows(
  rows: RowsMap,
  maxRow: number,
  maxCol: number,
  workSheet: Worksheet
) {
  let resultRows = "";
  const rowsSpan: number[] = [];
  for (let index = 1; index <= maxRow; index++) {
    let result = "";
    const orderCell = `<td class="order order-row">${index}</td>`;
    let rowHeight: number;
    // add default.
    if (!rows[index]) {
      rowHeight = CELL_HEIGHT;
      result += genEmptyRow(maxCol, orderCell);
    } else {
      // generate cells.
      const { height } = rows[index];
      let cellsResult = "";
      for (let j = 1; j <= maxCol; j++) {
        const curCell = workSheet.findCell(index, j);
        if (!curCell) {
          cellsResult += "<td></td>";
        } else {
          cellsResult += genCell(curCell);
        }
      }
      let rowAttrs = "";
      if (height) {
        rowAttrs += ` style="height:${height}px;"`;
        rowHeight = height;
      } else {
        rowHeight = CELL_HEIGHT;
      }
      result += `<tr${rowAttrs}>${orderCell}${cellsResult}</tr>`;
    }

    resultRows += result;
    rowsSpan[index] = rowHeight;
  }
  return { resultRows, rowsSpan };
}

function genOrderCols(maxCol: number, workSheet: Worksheet) {
  const curDefaultColWidth = workSheet.properties.defaultColWidth || 9;
  let sheetWidth = 0;
  let orderCol = '<td class="order order-row"></td>';
  let colStyles = "";
  const colsSpan: number[] = [];
  for (let j = 1; j <= maxCol; j++) {
    const column = workSheet.getColumn(j);
    orderCol += `<td class="order order-col index-${j}">${column.letter}</td>`;
    if (!column.width) {
      sheetWidth += CELL_WIDTH;
      colsSpan[j] = CELL_WIDTH;
    } else {
      const curCellWidth = (column.width * CELL_WIDTH) / curDefaultColWidth;
      colsSpan[j] = curCellWidth;
      sheetWidth += curCellWidth;
      colStyles += `.${TBODY_CLS} td.index-${j} { width: ${curCellWidth}px; }`;
    }
  }
  return {
    sheetWidth,
    orderCol,
    colStyles,
    colsSpan,
  };
}

interface RowsMap {
  [key: string]: Row;
}
export default async function genSheet(workSheet: Worksheet) {
  const positionMap: RowsAndColsSpanMap = {
    rows: [],
    cols: [],
  };
  // generate rows.
  const rows: RowsMap = {};
  workSheet.eachRow((row, rowNumber) => {
    rows[rowNumber] = row;
  });
  const lastRow = (workSheet.lastRow && workSheet.lastRow.number) || 0;
  const maxRow = Math.max(lastRow, MINIMUM_NUMBER_ROWS);
  const lastColumn = (workSheet.lastColumn && workSheet.lastColumn.number) || 0;
  const maxCol = Math.max(lastColumn, MINIMUM_NUMBER_COLS);

  const { resultRows, rowsSpan } = genRows(rows, maxRow, maxCol, workSheet);
  positionMap.rows = [FIRST_ORDER_ROW_HEIGHT, ...rowsSpan];
  const { sheetWidth, orderCol, colStyles, colsSpan } = genOrderCols(
    maxCol,
    workSheet
  );
  positionMap.cols = [FIRST_ORDER_COL_WIDTH, ...colsSpan];

  let result = wrapTable(orderCol + resultRows);
  const tableStyle = `.${TABLE_CLS} { width: ${sheetWidth}px; }`;
  const imgHtml = await genImageHtml(workSheet, positionMap);
  result += imgHtml;
  result += `<style>${tableStyle}${colStyles}</style>`;
  result += genBaseCSS();
  return result;
}
