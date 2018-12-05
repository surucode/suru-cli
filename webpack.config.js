const path = require("path");

module.exports = {
  entry: path.join(__dirname, "/src/index.ts"),
  output: {
    filename: "suru.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [],
  mode: "production",
  target: "node"
};
