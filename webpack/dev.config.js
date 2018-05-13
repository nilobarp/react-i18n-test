const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const path = require("path");
var Visualizer = require("webpack-visualizer-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: "./src/bootstrap/index.tsx",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    path: path.resolve(__dirname, "..", "build"),
    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    publicPath: "/"
  },

  devtool: "inline-source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "../public"),
    publicPath: "/",
    historyApiFallback: true,
    progress: true,
    port: 9001
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      modules: path.resolve(__dirname, "..", "src", "modules"),
      components: path.resolve(__dirname, "..", "src", "components"),
      locales: path.resolve(__dirname, "..", "src", "locales"),
      services: path.resolve(__dirname, "..", "src", "services"),
      utils: path.resolve(__dirname, "..", "src", "utils")
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "stage-0"],
              cacheDirectory: true,
              plugins: [["import", { libraryName: "antd", style: true }]]
            }
          },
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      { test: /\.css$/, loaders: ["css-loader"] },
      { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
    new Dotenv({
      path: ".env", // Path to .env file (this is the default)
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new Visualizer({
      filename: "./webpack-stats.html"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    HtmlWebpackPluginConfig
  ]
};
