const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV === "production";

// dev configs (prod configs overwrite these below)
const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    host: "localhost",
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "/dist"),
      publicPath: "/",
    },
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/api/**": {
        target: "http://localhost:3000/",
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/favicon.ico", to: "favicon.ico" }],
    }),
    // Add Dotenv plugin for development
    new Dotenv({
      systemvars: true, // Load all system variables
      safe: true, // Load '.env.example' to verify the '.env' variables
      defaults: false, // Don't load .env.defaults
      expand: true, // Allows for expanding variables
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

if (isProduction) {
  config.mode = "production";
  config.devtool = "source-map";
  config.devServer = {};
  config.optimization = {
    splitChunks: {
      chunks: "all",
    },
  };
  config.output = {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash].chunk.js",
    publicPath: "/",
  };
  config.plugins = [
    ...config.plugins,
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new TerserPlugin(),
    new CleanWebpackPlugin(),
  ];
}

module.exports = config;
