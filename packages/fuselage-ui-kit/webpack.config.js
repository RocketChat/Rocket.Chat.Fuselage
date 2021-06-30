'use strict';

const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const pkg = require('./package.json');

module.exports = (env, { mode = 'production' }) => ({
  entry: {
    'fuselage-ui-kit': path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: `[name].${mode}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'RocketChatFuselageUiKit',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  devtool: mode === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  externals: ['react', 'react-dom', /^@rocket.chat\//],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: false,
      reportFilename: path.join(__dirname, 'bundle-report.html'),
      openAnalyzer: false,
    }),
  ],
});
