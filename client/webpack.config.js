const path = require('path')
const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: 'index.html',
})

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash].css',
})

const CleanWebpackPlugin = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()
const ManifestPlugin = require('webpack-manifest-plugin')
const manifestPlugin = new ManifestPlugin({
  writeToFileEmit: true
})
const providePlugin = new webpack.ProvidePlugin({
  Promise: 'es6-promise',
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const copyWebpackPlugin = new CopyWebpackPlugin([{
  from: path.join(__dirname, 'assets'),
  to: path.join(__dirname, 'public'),
}])

module.exports = (env, argv) => ({
  entry: {
    app: [ './src/index.tsx' ]
  },
  devtool: argv.mode === 'development' ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules(?!(\/|\\)query-string)/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules=true',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif|svg|ico|pdf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'img/[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.sass'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  externals: {
    BodyBankEnterprise: 'BodyBankEnterprise',
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'client.js',
  },
  devServer: {
    compress: true,
    inline: true,
    port: 9000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    cleanPlugin,
    copyWebpackPlugin,
    miniCssExtractPlugin,
    htmlPlugin,
    manifestPlugin,
    providePlugin,
  ],
})
