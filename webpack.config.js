const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    popup: "./src/popup/popup.js",
    options: "./src/options/options.js",
    newtab: "./src/newtab/newtab.js",
    background: "./src/background/background.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "blocked.html", to: "blocked.html" },
        { from: "src/popup/popup.html", to: "popup.html" },
        { from: "src/options/options.html", to: "options.html" },
        { from: "src/newtab/newtab.html", to: "newtab.html" },
      ],
    }),
  ],
};