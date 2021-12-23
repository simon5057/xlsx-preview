import { XlsxData, XlsxOptions } from "./types";
export declare function xlsx2Html(data: XlsxData, options?: XlsxOptions): Promise<string | ArrayBuffer | string[] | Promise<ArrayBuffer>[]>;
declare const _default: {
    xlsx2Html: typeof xlsx2Html;
};
export default _default;
