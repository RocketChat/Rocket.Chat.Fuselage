'use strict';

const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, { mode = 'production' }) => ({
  entry: {
    fuselage: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    filename: `[name].${mode}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'RocketChatFuselage',
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: {
                id: 'fuselage-style',
              },
              injectType: 'lazySingletonStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-svg')(),
                  require('postcss-custom-properties')(),
                  require('postcss-logical')({ preserve: true }),
                  require('postcss-dir-pseudo-class')({ dir: 'ltr' }),
                  require('autoprefixer')(),
                  mode === 'production' && require('cssnano'),
                ].filter(Boolean),
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  externals: [
    {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
    },
    'react-dom',
    '@rocket.chat/icons',
    '@rocket.chat/fuselage-hooks',
    'rc-trigger',
  ],
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: 'src/',
          from: '**/!(scss).d.ts',
          to: '../dist',
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: false,
      reportFilename: '../bundle-report.html',
      openAnalyzer: false,
    }),
  ],
});
