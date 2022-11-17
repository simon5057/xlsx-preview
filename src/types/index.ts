export type XlsxData = Blob | File | ArrayBuffer;

export interface XlsxOptions {
  output?: "string" | "arrayBuffer";
  format?: "xlsx" | "csv";
  separateSheets?: boolean;
  minimumRows?: number;
  minimumCols?: number;
}
