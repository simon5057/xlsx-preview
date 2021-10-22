const path = require("path");
const { ProvidePlugin } = require("webpack");

const baseConf = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      process: "process/browser",
    }),
  ],
  externals: {
    exceljs: 'ExcelJS'
  },
  devtool: "source-map"
};

module.exports = [
  {
    ...baseConf,
    output: {
      path: path.resolve("dist"),
      filename: "xlsxPreview.umd.js",
      libraryTarget: "umd",
      library: "xlsxPreview",
    },
  },
  {
    ...baseConf,
    output: {
      path: path.resolve("dist"),
      filename: "xlsxPreview.min.js",
      library: "xlsxPreview",
    },
  },
  {
    ...baseConf,
    output: {
      path: path.resolve("dist"),
      filename: "xlsxPreview.common.js",
      libraryTarget: "commonjs",
      library: { type: "commonjs" },
    },
  },
];