const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./site/index.js'],
  },

  output: {
    path: path.join(__dirname, 'gh-pages'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },

  devtool: 'source-map',

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
    ],
  },

  resolve: {
    alias: {
      'redux-datagrid': path.join(__dirname, 'src'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './site/index.html',
      inject: 'body',
    }),
  ],

  postcss: () => [
    require('postcss-modules-local-by-default'),
    require('postcss-import')({
      addDependencyTo: webpack,
    }),
    require('postcss-cssnext')({
      browsers: ['ie >= 8', 'last 2 versions'],
    }),
  ],
};
