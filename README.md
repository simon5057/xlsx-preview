## XlsxPreview

Preview the .xlsx in the browser, convert to HTML with styles.
The dependencies of this package is [exceljs](https://github.com/exceljs/exceljs), it build the pretty preview by exceljs.

### Demo

Jump to the [demo page](./demo.html)

### Installation

```
  npm install xlsx-preview
```
or
```
  yarn xlsx-preview
```

### Importing

#### CommonJS
``` js
  const xlsxPreview = require('xlsx-preview');
```
#### ESModule
``` js
  import xlsxPreview from 'xlsx-preview';
```
#### Browserify
Before import xlsxPreview.js on browser, you need import excel.js first.
``` html
  <script src="exceljs.js"></script>
  <script src="xlsxPreview.js"></script>
```

### Usage

``` js
  // ...
  const result = await xlsxPreview.xlsx2Html(data, options);
```
See [data](#data)
See [options](#options)
#### data
The `data` can be one of the types, ArrayBuffer, Blob, or File.
#### options
The `options` is optional.
``` ts
  export interface XlsxOptions {
    output?: "string" | "arrayBuffer";
    separateSheets: boolean;
    minimumRows: number;
    minimumCols: number;
  }
```
- `options.output`: default `"string"`, set the output format, string or ArrayBuffer.
- `separateSheets`: default `false`, whether the worksheets needs to be separated.
  - If `separateSheets: true`, the `result` will be an Array.
- `minimumRows`: default `20`, Regardless of whether the worksheet has enough rows, the minimum number of rows generated.
-  `minimumCols`: default `16`, Regardless of whether the worksheet has enough cols, the minimum number of cols generated.

