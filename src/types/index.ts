export type XlsxData = Blob | File | ArrayBuffer;

export interface XlsxOptions {
  output?: "string" | "arrayBuffer";
  separateSheets: boolean;
  minimumRows: number;
  minimumCols: number;
}
