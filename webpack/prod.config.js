const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
var Visualizer = require("webpack-visualizer-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "index.html",
  inject: "body",
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});

module.exports = {
  entry: "./src/bootstrap/activation.tsx",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    path: path.resolve(__dirname, "..", "build"),
    publicPath: "/"
  },

  devtool: "cheap-modules-source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "../public"),
    publicPath: "/",
    historyApiFallback: true
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
              // cacheDirectory: true,
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
      { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new Dotenv({
      path: ".env", // Path to .env file (this is the default)
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new Visualizer({
      filename: "./webpack-stats.html"
    }),
    HtmlWebpackPluginConfig,
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        {
          path:
            "https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js",
          type: "js"
        },
        {
          path:
            "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js",
          type: "js"
        }
        // {
        //   path: "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
        //   type: "css"
        // }
      ],
      append: false,
      publicPath: ""
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJSPlugin({
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],

  // When importing a modules whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
    "typeface-roboto": "typeface-roboto"
  }
};
