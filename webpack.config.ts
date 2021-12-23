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
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve("./src"), "node_modules"],
  },
  devtool: "source-map",
};

module.exports = [
  {
    ...baseConf,
    externals: {
      exceljs: "exceljs",
    },
    output: {
      path: path.resolve("dist"),
      filename: "xlsxPreview.umd.js",
      libraryTarget: "umd",
      library: "xlsxPreview",
    },
  },
  {
    ...baseConf,
    externals: {
      exceljs: "ExcelJS",
    },
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
      filename: "xlsxPreview.demo.js",
      library: "xlsxPreview",
    },
    devtool: undefined,
    cache: {
      type: "memory",
    },
    infrastructureLogging: {
      level: "log",
    },
  },
];
