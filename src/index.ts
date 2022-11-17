import { Workbook } from "exceljs";
import { Buffer } from "buffer";
import { Readable } from "readable-stream";
import { setMinimumNumberCols, setMinimumNumberRows } from "./constants/base";
import { sheetsInAll } from "./htmls/genHtmlStructure";
import genSheet from "./htmls/genSheet";
import { XlsxData, XlsxOptions } from "./types";

export async function xlsx2Html(data: XlsxData, options?: XlsxOptions) {
  if (options?.minimumRows) {
    setMinimumNumberRows(options.minimumRows);
  }
  if (options?.minimumCols) {
    setMinimumNumberCols(options.minimumCols);
  }
  let buffer: ArrayBuffer;
  if (data instanceof Blob) {
    buffer = await data.arrayBuffer();
  } else if (data instanceof ArrayBuffer) {
    buffer = data;
  } else {
    throw "xlsx2Html(data, options): The parameter data can only be passed ArrayBuffer, Blob or File type";
  }
  const workbook = new Workbook();
  if (options?.format == "csv") {
    let stream = new Readable();
    stream.push(Buffer.from(buffer));
    stream.push(null);
    await workbook.csv.read(stream);
  } else {
    await workbook.xlsx.load(buffer);
  }
  const sheetsLen = workbook.worksheets.length;
  const sheets: string[] = [];
  for (let idx = 0; idx < sheetsLen; idx++) {
    const result = await genSheet(workbook.worksheets[idx]);
    sheets.push(result);
  }
  // Separate sheets.
  if (options?.separateSheets === true) {
    if (options.output === "arrayBuffer") {
      const all = sheets.map((sheet) => toBuffer(sheet));
      return all;
    }
    return sheets;
  }
  const result = sheetsInAll(sheets, workbook.worksheets);
  // Output ArrayBuffer
  if (options?.output === "arrayBuffer") {
    return toBuffer(result);
  }
  return result;
}

function toBuffer(data: string) {
  const blob = new Blob([data], { type: "text/html" });
  return blob.arrayBuffer();
}

export default {
  xlsx2Html
}