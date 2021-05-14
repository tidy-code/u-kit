const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "build"),
    clean: true
  },
  devServer: {
    stats: 'errors-only',
    port: 3333,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["raw-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({ parallel: true })
    ],
    splitChunks: { chunks: "all" }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Caching",
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'static' }
      ]
  })
  ]
};