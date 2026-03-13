import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/main.js",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  output: {
    filename: "main.js",
    path: path.resolve("dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
